# Module: MMM-Tesla (early prototype)
The `MMM-Tesla` module is a <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a> addon. This module displays some of your <a href="https://www.tesla.com">Tesla's</a> data on your Mirror.

This is just an early prototype, supporting one vehicle only - displaying the location of the car, charge state, driving state and battery level in percentage. It can be easily expanded with more attributes, the API is rich! It uses
the unofficial Tesla JSON API from https://timdorr.docs.apiary.io

![alt Preview](https://raw.githubusercontent.com/janhenrik/pics/master/tesla.png)

## Installing the module
run `git clone https://github.com/janhenrik/MMM-Tesla.git` from inside your `MagicMirror/modules` folder. Then run `npm install` to install dependencies.


## Using the module
To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
		{
			module: 'MMM-Tesla',
			position: 'bottom_right',	// This can be any of the regions.
									// Best results in one of the side regions like: top_left
			config: {
				// See 'Configuration options' for more information.
				email: 'nn@example.com', 
				password: "XXXXXX",
				client_id: 'XXXXX',
				client_secret: 'XXXXXX',
				vehicle_id: 'XXXXX',
				google_api_key: 'XXXXX',
				refreshInterval: 1000 * 60 * 10 // 60 minutes
			}
		}
]
````

## Configuration options
The following properties can be configured:


<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>email</code></td>
			<td>Your tesla.com email adress, matching the owner's login information for https://my.teslamotors.com/user/login. <br>
				<br><b>Example:</b> <code>elon@tesla.com</code>
				<br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>password</code></td>
			<td>Your tesla.com password, matching the owner's login information for https://my.teslamotors.com/user/login.<br>
				<br><b>Example:</b> <code>password</code>
				<br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>client_id</code></td>
			<td>The current client_id is available <a href="http://pastebin.com/YiLPDggh">here</a>.
			<td><br>
				<br><b>Example:</b> <code>abc</code>
				<br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>client_secret</code></td>
			<td>The current client_secret is available <a href="http://pastebin.com/YiLPDggh">here</a>.
			<td><br>
				<br><b>Example:</b> <code>abc</code>
				<br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>vehicle_id</code></td>
			<td>The vehicle_id can be found calling https://owner-api.teslamotors.com/api/1/vehicles with e.g. curl with an OAuth-token attached. Documentation <a href="https://timdorr.docs.apiary.io/#reference/vehicles/vehicle-collection/list-all-vehicles">here</a>. Or simply install the excellent <a href="https://github.com/hjespers/teslams">teslams command line client</a> and run <b>teslacmd vehicles</b>... and get the vehicle_id from there.
			<td><br>
				<br><b>Example:</b> <code>abc</code>
				<br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>google_api_key</code></td>
			<td>You will need a Google API key, can be generated <a href="https://developers.google.com/maps/documentation/javascript/get-api-key">here</a>.
			<td><br>
				<br><b>Example:</b> <code>abc</code>
				<br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>refreshInterval</code></td>
			<td>How often this refreshes<br>
				<br><b>Example:</b> <code>60000</code>
				<br> I'm not stressing the service, so once an hour is default.
				<br><b>Default value:</b> <code>600000</code>
			</td>
		</tr>
	</tbody>
</table>
