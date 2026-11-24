import 'package:flutter/material.dart';
import 'models/complaint.dart';
import 'services/api_service.dart';

void main() {
  runApp(const CivicSyncApp());
}

class CivicSyncApp extends StatelessWidget {
  const CivicSyncApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CivicSync AI',
      theme: ThemeData(
        primarySwatch: Colors.teal,
        scaffoldBackgroundColor: Colors.grey[100],
      ),
      home: const DashboardScreen(),
    );
  }
}

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final ApiService apiService = ApiService();
  late Future<List<Complaint>> futureComplaints;

  @override
  void initState() {
    super.initState();
    futureComplaints = apiService.fetchComplaints();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('My Complaints')),
      body: FutureBuilder<List<Complaint>>(
        future: futureComplaints,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No complaints reported yet.'));
          }

          return ListView.builder(
            itemCount: snapshot.data!.length,
            itemBuilder: (context, index) {
              final complaint = snapshot.data![index];
              return Card(
                margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: ListTile(
                  title: Text('${complaint.category} (${complaint.complaintNumber})'),
                  subtitle: Text(
                    'Status: ${complaint.status} | Priority: ${complaint.priority}\n${complaint.description}',
                  ),
                  isThreeLine: true,
                  trailing: const Icon(Icons.arrow_forward_ios, size: 16),
                ),
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          // TODO: Navigate to ReportIssueScreen (Stage 4)
        },
        label: const Text('Report Issue'),
        icon: const Icon(Icons.add_a_photo),
      ),
    );
  }
}