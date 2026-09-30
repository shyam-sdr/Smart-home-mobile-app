# Home Monitor

> A smart-home monitoring experience designed to help users quickly understand what happened while they were away, what matters, and whether any action is required.

---

## Overview

Home Monitor is a mobile-first smart-home monitoring application concept.

The original scenario presented users with raw device information such as battery level, network strength, software version, device status, and a chronological activity log.

The main UX problem was:

> **The information was available, but users didn't know what actually deserved their attention or what they should do next.**

This project redesigns that experience around summary, prioritization, context, and action.

Instead of making users interpret raw device telemetry, the application answers:

1. What happened while I was away?
2. What matters?
3. Do I need to do anything?

---

# Problem Statement

A user returns home after being away for several hours.

The system may have recorded:

* Device activity
* Movement
* Device connectivity changes
* Software updates
* Device health information
* Security-related events
* Environmental changes

A traditional activity log makes the user manually interpret this information.

### The goal

Transform:

Raw Device Data
       ↓
Activity Logs
       ↓
User Interpretation


into:

Raw Device Data
       ↓
Event Interpretation
       ↓
Priority
       ↓
Context
       ↓
Recommended Action

---

# Solution

The redesigned experience focuses on an **attention-first home summary**.

### Home

The Home screen provides:

* Overall home status
* "While You Were Away" context
* Important events
* Activity summary
* Things worth knowing
* Action / no-action guidance

### Devices

Devices can be explored in two ways:

* By Location
* By Device Type

### Activity

Users can explore:

* All events
* Important events
* Activity events
* Security events
* Device events
* Connectivity events
* System events

### Event Details

Each important event provides:

* What happened
* When it happened
* Where it happened
* Which device was involved
* Event timeline
* Explanation
* Whether action is required

---

Shows:

> Everything looks normal

The user can immediately understand that no action is currently required.

## 4. Home — Attention State

Highlights situations that may require attention.

Example:

> Connection interrupted
> Device was offline for 12 minutes and recovered automatically.

## 5. Devices — By Location

Groups devices according to their physical location:

Living Room
Front Door
Bedroom
Kitchen
Backyard

## 6. Devices — By Type

Groups devices according to their category:

Security Cameras
Motion Sensors
Door Sensors
Environmental Sensors
Smart Plugs
Other Devices

## 7. Room Details

Shows all devices associated with a specific location.

Example:

Living Room

Living Room Camera
Motion Sensor
Smart Plug

## 8. Device Details

Provides technical information when users need it:

* Connection status
* Battery
* Network strength
* Last sync
* Software version
* Last restart
* Device actions

## 9. Activity / Events

Provides a complete event timeline with filters and severity indicators.

## 10. Event Details

Explains an event in human-readable language.

Example:

Connection interrupted

10:18 AM – 10:30 AM

Device was offline for 12 minutes
and recovered automatically.

No action required.

## 11. Notifications

Groups important device and home notifications.

## 12. Settings

Provides:

* Home profile
* Account
* Notifications
* Device management
* Preferences
* Privacy & Security
* Help & Support

# Project Structure

home-monitor/
│
├── src/
│   ├── App.jsx
│   ├── data.js
│   ├── main.jsx
│   └── styles.css
│
├── index.html
├── package.json
├── vite.config.js
└── README.md

### `App.jsx`

Contains the primary React application and UI components.

### `data.js`

Contains prototype device and event data.

### `styles.css`

Contains the application's custom styling and responsive layout.

### `main.jsx`

Application entry point.

# Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm

Check your versions:

node -v
npm -v

---

## Installation

Clone the repository:

git clone <your-repository-url>

Navigate to the project:

cd home-monitor

Install dependencies:

npm install

---

## Run Locally

Start the Vite development server:

npm run dev

The application will be available at the local URL shown by Vite, typically:

http://localhost:5173

---

# Future Improvements

With more development time, the following areas could be explored.

### 1. Real IoT Integration

Connect the application to real smart-home devices and sensor APIs.

Possible architecture:

Smart Devices
      ↓
IoT Gateway
      ↓
Backend / Event Processing
      ↓
API
      ↓
React Application

---

### 2. Smarter Event Correlation

Combine related events into meaningful incidents.

For example:

Wi-Fi disconnected
       +
Camera disconnected
       +
Camera unavailable
       +
Camera reconnected
       ↓
Network interruption
Camera unavailable for 12 minutes

---

### 3. Personalized Anomaly Detection

Learn normal household activity and surface unusual behavior.

Example:

Normal:
3–5 movement events during this period

Observed:
18 movement events

→ Unusual activity detected

---

### 4. Intelligent Notifications

Determine whether an event should trigger:

* Push notification
* In-app notification
* Daily summary
* No notification

The goal is to avoid unnecessary notification fatigue.

---

### 5. Multi-Home Support

Allow users to manage multiple properties:

My Home
Office
Parents' Home
Vacation Home

---

### 6. Multi-User Support

Support different household members with role-based permissions.

Owner
Admin
Member
Guest

---

### 7. Real-Time Updates

Use WebSockets or an event-driven architecture to update:

* Device status
* Activity
* Notifications
* Alerts

without refreshing the application.

---

# Assumptions

The assignment does not specify the complete device ecosystem, so the prototype makes the following assumptions:

* A home can contain multiple smart devices and sensors.
* Devices are associated with specific locations.
* Devices can be grouped by location and device type.
* The system continuously records device activity and status.
* Events have different levels of importance.
* Some device issues can resolve automatically.
* Users may return to the app after being away for several hours.
* Users have permission to view and control devices in their home.
* Technical telemetry is available but is secondary to actionable information.

---

# Key Design Decisions

### 1. Shifted from raw data to actionable insights

The experience is designed around:

What happened?
      ↓
What matters?
      ↓
Do I need to act?

### 2. Prioritized important information

The Home screen focuses on information that helps users make a quick decision.

### 3. Grouped devices by location and type

Users can browse devices according to their mental model.

### 4. Added event interpretation

Events are explained in human-readable language rather than presenting only raw logs.

### 5. Added event prioritization

Normal activity is visually separated from events that may require attention.

### 6. Kept technical information available

Technical telemetry was moved to deeper screens rather than removed from the product.

### 7. Added contextual actions

Actions are presented based on the event rather than showing generic controls everywhere.

---

# What I Would Explore With More Time

* Conduct usability testing with real users.
* Validate whether event severity classifications are understandable.
* Test whether location/type grouping matches user expectations.
* Explore personalized anomaly detection.
* Investigate the ideal notification strategy.
* Design for multiple simultaneous incidents.
* Test the experience with large event volumes.
* Connect the prototype to a real IoT/event backend.
* Measure time-to-understand and time-to-action.

---

# Project Outcome

The core design principle behind this project is:

> **Don't make users interpret the data themselves. Help them understand what happened, what matters, and what they should do next.**

The result is a smart-home monitoring experience that moves from:

Monitoring Dashboard

to:

Home Situation Awareness

while keeping detailed device information available when users need it.

---


