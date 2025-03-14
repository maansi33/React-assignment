import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function App() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://random-data-api.com/api/users/random_user?size=80');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError('Failed to load user data. Please check your internet connection or try again later.');
      setLoading(false);
    }
  };

  const nextUser = () => {
    if (currentIndex < users.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevUser = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Loading users...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!users.length) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No user data available.</Text>
      </View>
    );
  }

  const user = users[currentIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      <Image source={{ uri: user.avatar }} style={styles.avatar} />

      <View style={styles.infoBox}>
        <Text style={styles.label}><Text style={styles.bold}>ID:</Text> {user.id}</Text>
        <Text style={styles.label}><Text style={styles.bold}>UID:</Text> {user.uid}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Password:</Text> {user.password}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Name:</Text> {user.first_name} {user.last_name}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Username:</Text> {user.username}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Email:</Text> {user.email}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={prevUser} disabled={currentIndex === 0} style={[styles.button, currentIndex === 0 && styles.buttonDisabled]}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextUser} disabled={currentIndex === users.length - 1} style={[styles.button, currentIndex === users.length - 1 && styles.buttonDisabled]}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#007bff',
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginVertical: 4,
    color: '#555',
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  }
});
