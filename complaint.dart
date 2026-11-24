class Complaint {
  final String complaintNumber;
  final String category;
  final String description;
  final String status;
  final String priority;
  final double? latitude;
  final double? longitude;

  Complaint({
    required this.complaintNumber,
    required this.category,
    required this.description,
    required this.status,
    required this.priority,
    this.latitude,
    this.longitude,
  });

  factory Complaint.fromJson(Map<String, dynamic> json) {
    return Complaint(
      complaintNumber: json['complaint_number'] ?? '',
      category: json['category'] ?? 'Other',
      description: json['description'] ?? '',
      status: json['status'] ?? 'SUBMITTED',
      priority: json['priority'] ?? 'Low',
      latitude: json['latitude'] != null ? (json['latitude'] as num).toDouble() : null,
      longitude: json['longitude'] != null ? (json['longitude'] as num).toDouble() : null,
    );
  }
}