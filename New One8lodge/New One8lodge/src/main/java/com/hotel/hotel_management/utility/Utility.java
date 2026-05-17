package com.hotel.hotel_management.utility;


import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;

public class Utility {

	private static byte[] sharedvector = { 0x01, 0x02, 0x03, 0x05, 0x07, 0x0B, 0x0D, 0x11 };

	public String encryptText(String RawText) {

		if (RawText == null || RawText.equals("") || RawText.equals("null")) {
			return RawText;
		}

		String EncText = "";
		if (RawText != null && !RawText.trim().equalsIgnoreCase("")) {
			byte[] keyArray = new byte[24];
			byte[] temporaryKey;
			String key = "geniusinfotech";
			byte[] toEncryptArray = null;

			try {
				toEncryptArray = RawText.getBytes("UTF-8");
				MessageDigest m = MessageDigest.getInstance("MD5");
				temporaryKey = m.digest(key.getBytes("UTF-8"));
				if (temporaryKey.length < 24) // DESede require 24 byte length key
				{
					int index = 0;
					for (int i = temporaryKey.length; i < 24; i++) {
						keyArray[i] = temporaryKey[index];
					}
				}

				Cipher c = Cipher.getInstance("DESede/CBC/PKCS5Padding");
				c.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(keyArray, "DESede"), new IvParameterSpec(sharedvector));
				byte[] encrypted = c.doFinal(toEncryptArray);
				EncText = Base64.encodeBase64String(encrypted);
			} catch (NoSuchAlgorithmException | UnsupportedEncodingException | NoSuchPaddingException
					| InvalidKeyException | InvalidAlgorithmParameterException | IllegalBlockSizeException
					| BadPaddingException NoEx) {
				EncText = "";
//					log.error("encryptText", NoEx);
				// NoEx.printStackTrace();
			}
		}
		return EncText;
	}

	// To decript String Data
	public String decryptText(String EncText) {

		if (EncText == null || EncText.equals("") || EncText.equals("null")) {
			return EncText;
		}

		String RawText = "";
		byte[] keyArray = new byte[24];
		byte[] temporaryKey;
		String key = "geniusinfotech";
		try {
			MessageDigest m = MessageDigest.getInstance("MD5");
			temporaryKey = m.digest(key.getBytes("UTF-8"));

			if (temporaryKey.length < 24) // DESede require 24 byte length key
			{
				int index = 0;
				for (int i = temporaryKey.length; i < 24; i++) {
					keyArray[i] = temporaryKey[index];
				}
			}
			Cipher c = Cipher.getInstance("DESede/CBC/PKCS5Padding");
			c.init(Cipher.DECRYPT_MODE, new SecretKeySpec(keyArray, "DESede"), new IvParameterSpec(sharedvector));
			byte[] decrypted = c.doFinal(Base64.decodeBase64(EncText));
			RawText = new String(decrypted, "UTF-8");
		} catch (NoSuchAlgorithmException | UnsupportedEncodingException | NoSuchPaddingException | InvalidKeyException
				| InvalidAlgorithmParameterException | IllegalBlockSizeException | BadPaddingException NoEx) {
			RawText = "";
//				log.error("decryptText()", NoEx);
			// NoEx.printStackTrace();
		}

		return RawText;

	}

//		public String getSerialNo() {
//			String SerialNo = "";
//			pro = new PropertiesFileManager();
//			if (pro.isFileExisted()) {
//				BasicFileAttributes fileattribute = pro.getBasicAttributes(pro.getFilePath());
//				// Map<String, String> propertiesData = pro.readFile();
//				// machineAddress=propertiesData.get("auth");
//				SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm");
//				SerialNo = this.encryptText(sdf.format(fileattribute.creationTime().toMillis()));
//			}
	//
//			return SerialNo;
//		}
	//
//		// To retrive regitsration Date;
//		public String getRegistrationDate() {
//			String regitrationDate = "";
//			pro = new PropertiesFileManager();
//			if (pro.isFileExisted()) {
//				BasicFileAttributes fileattribute = pro.getBasicAttributes(pro.getFilePath());
//				// Map<String, String> propertiesData = pro.readFile();
//				// machineAddress=propertiesData.get("auth");
//				SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
//				regitrationDate = this.encryptText(sdf.format(fileattribute.creationTime().toMillis()));
//			}
//			return regitrationDate;
//		}
	//
//		// To retrive regitsration Date;
//		public Long getRegistrationDateLongFormate() {
//			long dd = 00;
//			pro = new PropertiesFileManager();
//			if (pro.isFileExisted()) {
//				BasicFileAttributes fileattribute = pro.getBasicAttributes(pro.getFilePath());
//				// Map<String, String> propertiesData = pro.readFile();
//				// machineAddress=propertiesData.get("auth");
//				SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
//				// regitrationDate =
//				// this.encryptText(sdf.format(fileattribute.creationTime().toMillis()));
//				dd = (fileattribute.creationTime()).toMillis();
//			}
	//
//			return dd;
//		}
	//
//		// To retrive Last Updates regitsration Date;
//		public String getLastDate() {
//			String updateDates = "";
//			pro = new PropertiesFileManager();
//			if (pro.isFileExisted()) {
//				BasicFileAttributes fileattribute = pro.getBasicAttributes(pro.getFilePath());
//				SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
	//
//				updateDates = this.encryptText(sdf.format(fileattribute.lastModifiedTime().toMillis()));
//			}
//			return updateDates;
//		}
	//
//		// To get authentication Date
//		public String getAuthenticationDate() {
//			String authenticationDate = "";
//			pro = new PropertiesFileManager();
//			if (pro.isFileExisted()) {
//				BasicFileAttributes fileattribute = pro.getBasicAttributes(pro.getFilePath());
//				Map<String, String> propertiesData = pro.readFile();
//				String authes = this.decryptText(propertiesData.get("auth"));
//				if (authes.equalsIgnoreCase("")) {
//					return authenticationDate = "";
//				}
//				Date d = new Date(authes);
//				SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
//				authenticationDate = this.encryptText(sdf.format(d));
//			}
//			return authenticationDate;
//		}
	//
//		public String getFielAuth() {
	//
//			String authenticationDate = "";
//			pro = new PropertiesFileManager();
//			if (pro.isFileExisted()) {
//				BasicFileAttributes fileattribute = pro.getBasicAttributes(pro.getFilePath());
//				Map<String, String> propertiesData = pro.readFile();
//				authenticationDate = propertiesData.get("auth");
//			}
//			return authenticationDate;
//		}
	//
//		// To retrive regitsration Date;
//		public boolean getRegistrationFile() {
//			String regitrationDate = "";
//			boolean status = false;
//			pro = new PropertiesFileManager();
//			if (pro.isFileExisted()) {
//				status = true;
//			}
//			return status;
//		}

	/*
	 * private void getBiosFromDatabase() { String counterNo; Connection connection
	 * = null; PreparedStatement pstmt = null; String macfrmdbqry =
	 * "select * from tblregistration where reg_mac = ?"; try { pstmt =
	 * connection.prepareStatement(macfrmdbqry); ResultSet rsmac =
	 * pstmt.executeQuery(); while (rsmac.next()) { counterNo =
	 * rsmac.getString("reg_counterno"); } pstmt.close(); } catch (SQLException e) {
	 * log.error("getBiosFromDatabase()", e); } finally { if (pstmt != null) { try {
	 * pstmt.close(); } catch (SQLException e) { log.error("getBiosFromDatabase()",
	 * e); } } if (connection != null) { try { connection.close(); } catch
	 * (SQLException e) { log.error("getBiosFromDatabase()", e); } } } }
	 */
	public Date getDateWithTime(Date date, String time) {
		DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
		// SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm");
		java.util.Date sdate = null;
		try {
			sdate = sdf.parse(df.format(date) + " " + time);
		} catch (ParseException e2) {
//				log.error("", e2);
		}

		return sdate;
	}

	// The parameter of delay_time_second used to check if its 0 then return delay
	// time based on calculation otherwise return delay time.
	public long getInitialDelay(Date date, String time, long repeat, long delay_time_second) {
		if (delay_time_second == 0) {

			DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm");
			java.util.Date sdate = null;
			try {
				sdate = sdf.parse(df.format(date) + " " + time);
			} catch (ParseException e2) {
//				log.error("", e2);
			}

			Calendar calendar = Calendar.getInstance();
			calendar.setTime(sdate);
			// get time in ms for the given scheduler data & time
			long startTime = calendar.getTimeInMillis();
			Calendar currentCalendar = Calendar.getInstance();
			// get time in ms for the current date & time
			long currentTime = currentCalendar.getTimeInMillis();
			// calculating initial delay
			long initialDelay = currentTime - startTime;
			// if initial delay is less than 0 meaning scheduler date is set as future date
			// & it will start after the initial delay
			if (initialDelay < 0) {
				initialDelay = Math.abs(initialDelay) / 1000;
			} else {
				if ((initialDelay / 1000) < 60) {
					initialDelay = (initialDelay / 1000);
				} else {
					// if initial delay is greater than = 0 meaning past date is set for scheduler
					// and need to calculate initial delay for the next repetition
					long repeatInMS = (repeat * 1000); // repeat value in ms
					// calculate the repeat counts from start time till current time i.e. last
					// repeat count
					int repeatCount = (int) (initialDelay / repeatInMS);
					// calculate new time for delay by the given formula
					/*
					 * This formula first gets the time at last repeat count by adding the value of
					 * repeat count diff to start time after which added to repeat value which will
					 * given delay to scheduler i.e. from what time the scheduler should start
					 */
					long newTime = ((repeatInMS * repeatCount) + startTime) + repeatInMS;
					// abs is used because the value can be -ve if the new time will be less than
					// current time
					initialDelay = Math.abs(newTime - currentTime) / 1000;
				}
			}
			// return the initial delay in seconds
			return initialDelay;
		} else {
			return delay_time_second;
		}
	}

	public long getInitialDelay(Date date, String time, long repeat) {
		DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm");
		java.util.Date sdate = null;
		try {
			sdate = sdf.parse(df.format(date) + " " + time);
		} catch (ParseException e2) {
//				log.error("", e2);
		}

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(sdate);
		// get time in ms for the given scheduler data & time
		long startTime = calendar.getTimeInMillis();
		Calendar currentCalendar = Calendar.getInstance();
		// get time in ms for the current date & time
		long currentTime = currentCalendar.getTimeInMillis();
		// calculating initial delay
		long initialDelay = currentTime - startTime;
		// if initial delay is less than 0 meaning scheduler date is set as future date
		// & it will start after the initial delay
		if (initialDelay < 0) {
			initialDelay = Math.abs(initialDelay) / 1000;
		} else {
			if ((initialDelay / 1000) < 60) {
				initialDelay = (initialDelay / 1000);
			} else {
				// if initial delay is greater than = 0 meaning past date is set for scheduler
				// and need to calculate initial delay for the next repetition
				long repeatInMS = (repeat * 1000); // repeat value in ms
				// calculate the repeat counts from start time till current time i.e. last
				// repeat count
				int repeatCount = (int) (initialDelay / repeatInMS);
				// calculate new time for delay by the given formula
				/*
				 * This formula first gets the time at last repeat count by adding the value of
				 * repeat count diff to start time after which added to repeat value which will
				 * given delay to scheduler i.e. from what time the scheduler should start
				 */
				long newTime = ((repeatInMS * repeatCount) + startTime) + repeatInMS;
				// abs is used because the value can be -ve if the new time will be less than
				// current time
				initialDelay = Math.abs(newTime - currentTime) / 1000;
			}
		}
		// return the initial delay in seconds
		return initialDelay;
	}

	public static void main(String[] args) {
		Utility u = new Utility();
			System.out.println(u.decryptText("q+mxg9Fy2K0ft3qicHmajA=="));
//		System.out.println(u.encryptText("2024-12-13"));
	}
}
