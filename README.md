<h1>React weather app</h1>
This is a simple weather app built using React and Redux. API from https://www.weatherapi.com
<h2>Try it by yourself: </h2>
1. Clone the repository on your device via git clone: <b>git clone https://github.com/wkinMe/weatherApp</b><br>
2. Install all the necessary libs: <b>npm install</b></br>
3. Start the app: <b>npm start</b>
<h5>strong text means that you have to do correspond command in the shell or something similar</h5>
<h2>Functional</h2>
<ul>
  <li>Add new city to the list(by doing this you immediately get current weather on the screen)</li>
  <li>Remove city from the list</li>
  <li>Check forecast for 7 days of the city(by clicking on the card on the main page)<br><i>P. S. It's only 3 days because this is maximum of free API</i></li>
</ul>
<h2>How does the code works?</h2>
This app use <i>Axios</i> library to get information from server.<br>There are 2 functions to get info: <i>getCurrentWeather</i>, <i>getForecast</i>. When user clicks "Enter" after he wrote city name, <i>getCurrentWeatherFunction</i> is called. <i>getForecast</i> calls when the user clicks on the card to see the forecast info.
<br><br>
The app uses Redux. There is store consists of 2 slices: <i>weatherNowSlice</i>, <i>forecastSlice</i>.<br>
Inintial state of <i>wheatherNowSlice</i> consists from <i>city</i>(wheather of city array), <i>isLoading</i>(load indicator) and <i>error</i>(error message string). To create slice I use <i>createSlice</i> function, that makes work with slices easier, and also make it really easy to work with Redux Thunks. Reducers of this slice allows us to to remove the city(removeCity) and hide error message(hideErrorMessage) after some time if an error occurs. Also there is <i>extrareducers</i> that allows to change state depending on the state of promise that we receive when requesting the server. <i>extrareducers</i> has 3 cases: <i>pending</i>(request being processed), <i>rejected</i>(error while being processed), <i>fullfilled</i>(response was received). While <i>pending</i> app show loading text, if <i>rejected</i> app shows error message, if <i>fullfilled</i> it checks if there is city with the same name as the name of city of response.<br>
<i>forecaseSlice</i> has the same 
