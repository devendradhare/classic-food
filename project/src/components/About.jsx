import React from 'react';
import { Clock, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Since 1995, Classic Food has been serving exceptional cuisine that combines traditional
          flavors with modern culinary techniques. Our passion for food and dedication to quality
          has made us a beloved destination for food enthusiasts.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Hours</h3>
          <p className="text-gray-600">
            Mon-Fri: 11am - 10pm<br />
            Sat-Sun: 10am - 11pm
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Private Events</h3>
          <p className="text-gray-600">
            Host your special occasions<br />
            in our private dining room
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Awards</h3>
          <p className="text-gray-600">
            Best Restaurant 2023<br />
            Chef's Choice Award
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000"
          alt="Restaurant interior"
          className="rounded-lg shadow-lg"
        />
        <div>
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="text-gray-600 mb-6">
            At Classic Food, we believe in creating memorable dining experiences through exceptional
            food, warm hospitality, and attention to detail. Our mission is to preserve the art of
            traditional cooking while embracing innovation and sustainability.
          </p>
          <p className="text-gray-600">
            Every dish we serve is crafted with carefully selected ingredients from local suppliers,
            ensuring the highest quality and supporting our community. Our team of passionate chefs
            and staff work together to provide an unforgettable dining experience for every guest.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;