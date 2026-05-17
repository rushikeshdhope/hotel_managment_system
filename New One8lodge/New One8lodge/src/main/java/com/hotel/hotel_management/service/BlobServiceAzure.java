package com.hotel.hotel_management.service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hotel.hotel_management.model.StoredImages;

@Service
public interface BlobServiceAzure {
	
	StoredImages storeFile(String filename, InputStream content, long length,Integer recordId);

	ByteArrayOutputStream downloadFile(String blobitem);

	List<String> listFiles();

	void deleteFile(String keyName);
}
