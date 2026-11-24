import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import '../models/complaint.dart';

class ApiService {
  // Use 10.0.2.2 for Android Emulator connecting to localhost backend
  static const String baseUrl = 'http://10.0.2.2:5000/api';

  Future<List<Complaint>> fetchComplaints() async {
    final response = await http.get(Uri.parse('$baseUrl/complaints'));

    if (response.statusCode == 200) {
      List jsonResponse = json.decode(response.body);
      return jsonResponse.map((data) => Complaint.fromJson(data)).toList();
    } else {
      throw Exception('Failed to load complaints');
    }
  }

  Future<bool> submitComplaint(String category, String description, double lat, double lng, File? imageFile) async {
    var request = http.MultipartRequest('POST', Uri.parse('$baseUrl/complaints'));
    
    request.fields['category'] = category;
    request.fields['description'] = description;
    request.fields['latitude'] = lat.toString();
    request.fields['longitude'] = lng.toString();

    if (imageFile != null) {
      request.files.add(
        await http.MultipartFile.fromPath('image', imageFile.path),
      );
    }

    var response = await request.send();
    return response.statusCode == 201;
  }
}