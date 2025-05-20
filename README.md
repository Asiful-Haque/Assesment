# Assessment

This repository contains the solution for the assessment, consist of both frontend and fullstack tasks. The project is developed using Next.js and React, ensuring a dynamic and responsive user experience. You can have the video demo of this assessment in the given link.
https://drive.google.com/file/d/1wF97llAO6o0eNTjO_uqsn68UiIenwhuW/view?usp=sharing



## 🛠️ Tech Stack

**🚀 Next.js:** Framework for server-rendered React applications, and UI.

**📊 Recharts, D3.js:**  Libraries for   data visualization.

**🎨 Tailwind CSS:**  For styling components.










## 🌟 Features
1️⃣ Task-1

*Interactive Bar Chart*

Developed an interactive bar chart showcasing three variables named Product, TotalValue, TotalSales. Predefined colors are used as per the requirement. Graphs barts are sorted by value.
- Dynamic data rendering.
- Responsive design.
- Hover effects to display detailed information.

![App Screenshot](https://res.cloudinary.com/ddrvm4qt3/image/upload/v1747667827/Screenshot_6_b1ikxh.png)



*Gauge Chart*

Implemented a gauge chart with two variables named month and sales. Also this chart is dynamic and works as per user actions.

- Categorizes values into Low, Medium, and High based on range
- Low: ≤ 3,000,000
- Medium: > 3,000,000 and < 7,000,000
- High: ≥ 7,000,000
- Interactive status selection for different months (e.g., March, December).

![App Screenshot](https://res.cloudinary.com/ddrvm4qt3/image/upload/v1747667875/Screenshot_7_m6jzv5.png)

![App Screenshot](https://res.cloudinary.com/ddrvm4qt3/image/upload/v1747667911/Screenshot_8_tdq6y6.png)



2️⃣ Task-2

*Interactive ML powered Dashboard*

focuses on building an analytical dashboard with interactive charts, role-based access control. The app features sidebar navigation, filters, and dynamic visuals built using Next.js and React. 

- Sidebar navigation.
- Visual representations of data.
- Filters to customize data views.
- Access permission as per the user

![App Screenshot](https://res.cloudinary.com/ddrvm4qt3/image/upload/v1747722585/Screenshot_from_2025-05-17_16-50-03_n5ochy.png)

![App Screenshot](https://res.cloudinary.com/ddrvm4qt3/image/upload/v1747722610/Screenshot_from_2025-05-17_16-49-08_k6xl7d.png)

![App Screenshot](https://res.cloudinary.com/ddrvm4qt3/image/upload/v1747722634/Screenshot_from_2025-05-17_16-48-59_n86ykc.png)

![App Screenshot](https://res.cloudinary.com/ddrvm4qt3/image/upload/v1747722654/Screenshot_from_2025-05-17_16-48-53_ahfdwy.png)

**<<<----------------------------------------------------🤖Machine Learning Model🤖------------------------------------------------------------>>>**

![App Screenshot](https://res.cloudinary.com/ddrvm4qt3/image/upload/v1747722675/Screenshot_from_2025-05-17_16-49-41_lfnp82.png)







## 🔗 URL Reference

#### 📊 Graphs - Task-1

```http
  / -> Base URL For Bar Chart
```
```http
  /gauge -> URL For Gauge Chart
```

#### 👤 User - Task-2

```http
  /login -> URL for User Login
```

#### 🌍 Dashborad - Task-2

```http
  /dashborad -> URL for Dashborad, ML Model, Settings
```
## Database ERD - Task-2

![App Screenshot](https://res.cloudinary.com/ddrvm4qt3/image/upload/v1747667511/ERD_lmoy2o.png)



## 📥 Installation

Install my-project with npm 🚀

```bash
  git clone https://github.com/Asiful-Haque/Assesment.git
  cd Assesment
```


```bash
  Install dependencies:
  npm install
```


```bash
  Start the development server:
  npm run dev
```

For Machine Learning Model



```bash
  git clone https://github.com/Asiful-Haque/Assesment.git
  cd Assesment
  cd Assesment-ML_Model
```
```bash
  pip install flask pandas scikit-learn joblib
```
Run the Model
```bash
  python model.py / python3 model.py
```
Run the Fastapi 
```bash
  pip install fastapi uvicorn pydantic
```
```bash
  uvicorn main.py:app --reload
```

## Feedback

If you have any feedback, please reach out to me at asiful35-2961@diu.edu.bd
