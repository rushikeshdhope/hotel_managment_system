package com.hotel.hotel_management.serviceImpl;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.hotel.hotel_management.model.Counts;
import com.hotel.hotel_management.model.StoredImages;
import com.hotel.hotel_management.repo.StoredImagesRepo;
import com.hotel.hotel_management.service.BlobServiceAzure;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Response;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Object;

@Service
public class BlobServiceImpl implements BlobServiceAzure {

	@Autowired
	CountsServiceImpl countsServiceImpl;

	@Autowired
	StoredImagesRepo imageRepo;

	@Value("${aws.s3.bucket-name}")
	private String bucketName;
	
	@Value("${aws.s3.region}")
	private String s3Region;
	
	@Value("${aws.s3.access-key}")
	private String s3AccessKey = "AKIAQKGGW425NTVLXPHK";
	
	@Value("${aws.s3.secret-key}")
	private String s3SecretKey = "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";

	private S3Client s3Client() {
		AwsBasicCredentials awsCreds = AwsBasicCredentials.create(s3AccessKey, s3SecretKey);
		return S3Client.builder().region(Region.of(s3Region))
				.credentialsProvider(StaticCredentialsProvider.create(awsCreds)).build();
	}

	@Override
	public List<String> listFiles() {
		S3Client s3Client = s3Client();
		ListObjectsV2Request listObjectsV2Request = ListObjectsV2Request.builder().bucket(bucketName).build();

		ListObjectsV2Response listObjectsV2Response = s3Client.listObjectsV2(listObjectsV2Request);
		List<String> files = new ArrayList<>();

		for (S3Object s3Object : listObjectsV2Response.contents()) {
			files.add(s3Object.key());
		}

		return files;
	}

	@Override
	public ByteArrayOutputStream downloadFile(String keyName) {
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		S3Client s3Client = s3Client();
		GetObjectRequest getObjectRequest = GetObjectRequest.builder().bucket(bucketName).key(keyName).build();

		s3Client.getObject(getObjectRequest, ResponseTransformer.toOutputStream(outputStream));

		return outputStream;
	}

	// Assuming this is set in your application properties
	@Value("${aws.s3.url}")
	private String s3Url;

	@Override
	public StoredImages storeFile(String filename, InputStream content, long length, Integer recordId) {
		Counts imgCount = countsServiceImpl.getImgCount(recordId);
		String abbreviation = imgCount.getAbbreviation();
		Long count = imgCount.getCount();
		String countString = count.toString();
		String finalFilename = abbreviation + countString + filename;
		S3Client s3Client = s3Client();

		PutObjectRequest putObjectRequest = PutObjectRequest.builder().bucket(bucketName).key(finalFilename)
				.contentLength(length).build();

		RequestBody requestBody = RequestBody.fromInputStream(content, length);

		s3Client.putObject(putObjectRequest, requestBody);

		// Update the StoredImage entity and save to the database
		StoredImages images = new StoredImages();
		images.setImage_name(finalFilename);
		images.setImg_link(s3Url + finalFilename);
		imgCount.setCount(count + 1);
		countsServiceImpl.saveImgCount(imgCount);

		return imageRepo.save(images);
	}
	
	public void deleteFile(String imageUrl) {
		String keyName = imageUrl.replace(s3Url, "");
		System.out.println("Deleting S3 Object with Key: " + keyName);
		S3Client s3Client = s3Client();
		DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder().bucket(bucketName).key(keyName).build();
		try {
			s3Client.deleteObject(deleteObjectRequest);
			System.out.println("Image deleted successfully.");
		} catch (Exception e) {
			System.err.println("Error deleting image: " + e.getMessage());
		}
	}

}
