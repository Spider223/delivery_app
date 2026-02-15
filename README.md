# Mini Delivery App (React Native)

A Mini Delivery App built using **React Native** that demonstrates strong architectural thinking, offline-first design, background location tracking, and post-shipment payment integration.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack & Libraries](#tech-stack--libraries)
- [Setup Instructions](#setup-instructions)
- [Architecture & Design Decisions](#architecture--design-decisions)
- [AI Usage](#ai-usage)
- [Future Improvements](#future-improvements)

---

## Project Overview

This app allows users to create delivery requests, track deliveries in real-time, and handle payments (COD or Online).  
It supports offline-first operations and uses background services to track active deliveries.

Key objectives:

- Offline-first order creation
- Consolidated order hub (local + remote data)
- Smooth delivery tracking with animated map markers
- Background location tracking with persistent notifications
- Post-shipment payment integration (COD/Online)

---

## Features

### 1. Order List Hub

- Displays all orders (remote/mock + locally saved)
- Pull-to-refresh functionality
- Highlights unsynced/pending orders
- Navigate:
  - **In Transit** → `TrackingScreen`
  - **Other statuses** → `OrderDetailsScreen`
- Floating Action Button (FAB) to create a new delivery request

### 2. Create Delivery Request

- Form fields:
  - Recipient Name
  - Address
  - Contact Information
- Offline-first support:
  - If offline, saves locally as "Pending to Sync"
- Navigates to payment selection after order creation
- Online payment disabled when offline, COD always available

### 3. Order Details Screen

- Displays:
  - Shipment details
  - Delivery status
  - Payment method
  - Payment status

### 4. Tracking Screen

- Animated map marker representing delivery vehicle
- Smooth movement using `AnimatedRegion` from `react-native-maps`
- Background tracking with `react-native-background-actions`
- Works when app is in foreground or background

---

## Tech Stack & Libraries

- **React Native CLI / Expo** – Framework
- **TypeScript** – Type safety
- **Zustand** – State management
- **AsyncStorage** – Local persistence
- **react-native-maps** – Map & marker visualization
- **react-native-background-actions** – Background location tracking
- **NetInfo** – Network connectivity
- **uuid** – Unique IDs for orders
- **Formik / React Hook Form** (optional) – Form handling

---

## Setup Instructions

1. **Clone the repository:**

```bash
git clone <your-repo-link>
cd mini-delivery-app
```
