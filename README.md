## Running the App

To run the app, follow these steps:

#### Install Dependencies

Make sure you have Node.js installed. Then, install the project dependencies by running:

```bash
npm install
```

#### Start the Development Server

Start the Vite development server by running:

```bash
npm run dev
```

This will start the development server and you can view the app in your browser at [http://localhost:5173/](http://localhost:5173).

#### Build for Production

To build the app for production, run:

```bash
npm run build
```
## Project Structure and Code Division

The code is divided into multiple files and hooks to ensure modularity, readability, and maintainability. Each component and hook has a single responsibility, making the code easier to understand and maintain. Custom hooks like `useFetchUsers`, `useModal`, and `useFormValidation` can be reused across different components. Business logic (e.g., data fetching, form validation) is separated from the UI components, leading to cleaner and more maintainable code. Memoization with `useCallback` and `useMemo` helps prevent unnecessary re-renders, improving the performance of the application.

#### Libraries Used

- **clsx**: For conditionally joining class names.
- **moment**: For formatting dates.
- **react-hot-toast**: For displaying toast notifications.
- **react-icons**: For using icons in the UI.
- **react-modal**: For creating modals.
- **react-spinners**: For displaying loading spinners.
- **uuid**: For generating unique IDs for new users.

#### Custom Hooks

- **useFetchUsers**: A custom hook for fetching user data from the API.
- **useModal**: A custom hook for managing the state of the modal.
- **useFormValidation**: A custom hook for validating form data.

### Development Data
The `mock/data.json` file was used only for development purposes to avoid extra fetching to the API. This approach ensures that the application can be developed and tested without relying on the availability of the external API.