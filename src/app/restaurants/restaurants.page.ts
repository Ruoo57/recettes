import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import axios from 'axios';

const restaurantIcon = L.icon({
  iconUrl: 'assets/icon/resto.png',
  iconSize: [30, 30], 
  iconAnchor: [15, 30],
  popupAnchor: [0, -30], 
});

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {
  map: L.Map | undefined;

  constructor() {}

  async ngOnInit() {
    await this.loadMap();
  }

  async ionViewDidEnter() {
    if (this.map) {
      setTimeout(() => {
        this.map?.invalidateSize();
      }, 200);
    }
  }

  async loadMap() {
    try {
      // Coordonnées de Metz
      const lat = 49.1193;
      const lng = 6.1757;

      // Initialiser la carte
      this.map = L.map('map', {
        center: [lat, lng],
        zoom: 13, 
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      L.marker([lat, lng])
        .addTo(this.map!)
        .bindPopup('Metz')
        .openPopup();

      // Récupère les restaurants à proximité
      this.getNearbyRestaurants(lat, lng);
    } catch (error) {
      console.error('Erreur lors de l’initialisation de la carte :', error);
    }
  }

  async getNearbyRestaurants(lat: number, lng: number) {
    try {
      const radius = 5000; // rayon en mètres 
      const url = `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=restaurant](around:${radius},${lat},${lng});out;`;

      const response = await axios.get(url);
      const restaurants = response.data.elements;

      if (!restaurants.length) {
        console.warn('Aucun restaurant trouvé dans cette zone.');
      }

      restaurants.forEach((restaurant: any) => {
        const restaurantLat = restaurant.lat;
        const restaurantLng = restaurant.lon;
        const name = restaurant.tags.name || 'Restaurant';

        L.marker([restaurantLat, restaurantLng], { icon: restaurantIcon }) 
          .addTo(this.map!)
          .bindPopup(`<b>${name}</b>`); 
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des restaurants :', error);
    }
  }
}
