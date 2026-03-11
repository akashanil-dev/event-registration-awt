# Abstract

The **Online Event Registration Portal** is a responsive web-based application designed to streamline and modernize the process of managing event registrations for a college technology festival. In many institutions, event registration is often handled manually through paper forms or basic spreadsheets, which can lead to errors, duplicate entries, long queues, and inefficient management of participant data. This project aims to provide a digital solution that allows students to easily view event details and register online through a user-friendly and interactive platform.

The system provides a dedicated **Event Listing Page** where all available events are displayed in an organized and visually appealing format using the **Bootstrap card layout**. Each event card includes important information such as the **event title, short description, and the number of available seats**. In addition, every card contains a **Registration button** that allows students to quickly initiate the registration process. The responsive design ensures that the application can be accessed smoothly on different devices such as desktops, tablets, and mobile phones, making the system convenient for students to use anytime and anywhere.

When a student clicks the **Register** button, a **Bootstrap modal form** appears on the screen without redirecting the user to a different page. This modal form collects essential participant details including **Student Name, Email Address, Phone Number, and the Selected Event**. The use of a modal window enhances the user experience by keeping the interaction simple, fast, and focused on the current page.

To ensure that the data entered by users is valid and complete, the system implements **client-side form validation using jQuery**. The validation process checks that all required fields are properly filled and that the input follows correct formats, such as a valid email address or phone number. This reduces the chances of incorrect or incomplete data being submitted and improves the overall reliability of the system.

Once the form passes validation, the registration data is submitted using an **AJAX POST request**. AJAX allows the application to send and receive data from the server **without reloading the webpage**, creating a smoother and faster user experience. After successful submission, users receive immediate feedback confirming that their registration has been completed.

On the server side, the application uses a **PHP backend** to process the incoming registration data and securely store it in a **MySQL database**. The database maintains records of all registered participants along with the events they have chosen. This structured storage allows administrators to easily manage event participation and retrieve information whenever required.

The system also includes a **Participant List feature**, which dynamically loads and displays the list of registered participants using AJAX. This allows users or event organizers to view updated participant information in real time without refreshing the page.

Several **advanced features** are incorporated to enhance the functionality of the portal. The system dynamically tracks the **number of available seats for each event** and updates the seat count whenever a new registration is completed. When the available seats reach zero, the system **automatically disables the registration button**, preventing further registrations and avoiding overbooking. Additionally, the portal displays **real-time seat availability**, helping students quickly identify which events still have open slots.

Overall, the **Online Event Registration Portal** provides an efficient, reliable, and user-friendly platform for managing event registrations. By integrating modern web technologies such as **HTML, CSS, Bootstrap, jQuery, AJAX, PHP, and MySQL**, the system ensures smooth interaction between the frontend interface and backend database. The project demonstrates how web technologies can be effectively used to simplify administrative tasks, improve user experience, and provide a scalable solution for event management in educational institutions.

# Team Details

| Member | Role | Task Description |
| :--- | :--- | :--- |
| Akash A | Project Leader | Coordinate team, manage Git/project folder, ensure integration of modules |
| Abhinand KK | UI Designer | Design layout, wireframe, color scheme |
| Albin Suresh | HTML Developer | Develop semantic HTML structure |
| Alfiya Ismail | CSS Developer | Implement styling and responsive design |
| Akshai Raj | Bootstrap Developer | Create responsive components using Bootstrap |
| Abhinanth S Pillai | JavaScript Developer | Implement client-side logic |
| Abhilash KK | jQuery Developer | Implement form validation and DOM manipulation |
| Abhinand M A | AJAX Developer | Handle asynchronous requests |
| Adonia Cyrus | PHP Backend Developer | Develop server-side logic |
| Alka Maria Jiss | Database Designer | Design MySQL tables and queries |
| Amal S Kumar | Integration Engineer | Connect frontend with backend |
| Aleena Roby | Tester & Documentation | Testing, debugging, documentation, demo preparation. |
