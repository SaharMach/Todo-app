 Ensure the following software is installed on your machine:
  
 **Node.js**
  
 **npm**

**.NET SDK**


1. Clone the Repository
Begin by cloning the repository and navigating into the project folder:

          git clone https://github.com/SaharMach/Todo-app.git
          
          cd Todo-app

2. Running the frontend
   
   1. Navigate to the frontend folder:
      
          cd frontend
      
   3. Install the required dependencies:
      
          npm i
      
   5. Run
      
          npm run dev
      
The frontend should now be running and accessible at http://localhost:5173.

3. Running the Backend

   1. Open a new terminal window or tab, and navigate to the backend folder:
      
          cd ../backend
      
   3. Restore the .NET dependencies:
      
          dotnet restore
   
   5. Run
      
          dotnet run
      
The backend API will be running and accessible at http://localhost:5049 by default.

The app should be running now, Open a web browser and navigate to the following URL: http://localhost:5173
          

