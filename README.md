# Music App Project

### Overview

The Music App is a React-based web application that allows users to search for music tracks using the Freesound API. The application retrieves data from the API and displays the results in a user-friendly interface, enabling users to browse and listen to audio previews of their selected tracks.

## Features

**Search Functionality:** Users can input a search term to query the Freesound API and receive a list of music tracks matching the input.

**Audio Playback:** Clicking on a track name plays an audio preview of the selected track using a native HTML audio player.

**Pagination:** Users can navigate through paginated search results with 'Previous' and 'Next' buttons.

**Loading State Management:** The app prevents user input and pagination actions while a request is in progress to ensure a smooth user experience.

**Error Handling:** Basic error logging is implemented to handle potential issues during API calls.

# Tech Stack

**React:** For building the user interface and managing component state.

**Axios:** For making HTTP requests to the Freesound API.

**HTML/CSS:** For structuring and styling the application.

## Installation and Setup

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Create a `.env` file and add your Freesound API token as an environment variable:

   ```
   REACT_APP_FREESOUND_API_TOKEN=YourTokenHere
   ```

5. Run `npm start` to launch the app.

# How to Use

Enter a search term in the input box and press Enter or click the Search button.

View the list of results and click on a track name to play its preview.

Use the 'Previous' and 'Next' buttons to navigate through multiple pages of results.

Future Improvements

Enhanced error handling and user feedback.

Improved styling and user experience.

Additional audio controls and features.

License

> This project is licensed under the MIT License. See LICENSE for more details.
