
# ipm package: anomaly-detection

![]https://i.imgur.com/WMiIitP.png()
## Overview

Run a self-training anomaly detection algorithm against a given dataset. The selected algorithm is Moving Median Decomposition as seen in this whitepaper for [Anomaly Detection for Predictive Maintenance](https://files.knime.com/sites/default/files/inline-images/Anomaly_Detection_Time_Series_final.pdf). This Library is for identification of items, events or observations which do not conform to an expected pattern or other items in a dataset.

This is an ipm package, which contains one or more reusable assets within the ipm Community. The 'package.json' in this repo is a ipm spec's package.json, [here](https://docs.clearblade.com/v/3/6-ipm/spec), which is a superset of npm's package.json spec, [here](https://docs.npmjs.com/files/package.json).

[Browse ipm Packages](https://ipm.clearblade.com)

## Setup

### Basic Usage (No Alerts)

Ready out-of-the-box

### Advanced Usage (With Alerts)

Requires API keys from Email and SMS Alerts via SendGrid and Twilio. 

See `AnomalyDetectionConstants` Library.

## Usage

### Portals

`AnomalyDetection` - Portal for viewing and configuring live datafeeds, rules, and alerts

### Code Services

`ExampleDetectAnomaly` - Runs anomaly detection against an example dataset, returns an array of Anomalies with metadata.

### Code Libraries

`AnomalyDetection` - Core library for detecting anomalies in datasets
`AnomalyDetectionConstants` - Optional credentials for Alerting (SMS via Twilio, Email via Sendgrid)
`jStat` - Dependency on [jstat-statistics-toolkit](https://github.com/rreinold/jstat-statistics-toolkit)
`TwilioSMS` - Dependency on [twilio-sms-library
](https://github.com/rreinold/twilio-sms-library)
`SendGridEmail` - Dependency on(https://github.com/rreinold/clearblade-sendgrid-email-integration)

### Collections

`Anomalies` - Tracks all detected anomalies
`AnomalyConfiguration` - Stores user-defined rules and alerts for Anomaly Detection

## API

## Members

## Functions

<dl>
<dt><a href="#AnomalyDetection">AnomalyDetection()</a></dt>
<dd><p>Detects Anomalies with Moving Median Decomposition
See attached whitepaper for Anomaly Detection for Predictive Maintenance
<a href="https://files.knime.com/sites/default/files/inline-images/Anomaly_Detection_Time_Series_final.pdf">https://files.knime.com/sites/default/files/inline-images/Anomaly_Detection_Time_Series_final.pdf</a></p>
<p>Run a self-training anomaly detection algorithm against a given dataset</p>
</dd>
<dt><a href="#Twilio">Twilio(user, pass, sourceNumber)</a></dt>
<dd><p>Sends a text message using Twilio&#39;s REST API.</p>
</dd>
<dt><a href="#DetectAnomaly">DetectAnomaly()</a> ⇒ <code>AnomalyVisual</code></dt>
<dd><p>Detects an anomaly in the last X MQTT Messages
Uses &#39;AnomalyConfiguration&#39; config to check for a key in the JSON of each message.
ex. &#39;sensor_key&#39; will be set to &#39;temperature&#39;, so we know to pull the temperature key/value pair from a mqtt message like this:
{&quot;temperature&quot;:40,&quot;humidity&quot;:31}</p>
</dd>
<dt><a href="#ExampleDetectAnomaly">ExampleDetectAnomaly()</a> ⇒ <code><a href="#Anomaly">Array.&lt;Anomaly&gt;</a></code></dt>
<dd><p>Example logic for detecting anomalies in a dataset of sensor values</p>
</dd>
<dt><a href="#SaveAnomalyConfiguration">SaveAnomalyConfiguration()</a></dt>
<dd><p>Ingests updated anomaly configuration, and saves to AnomalyConfiguration Collection</p>
</dd>
<dt><a href="#SendAlert">SendAlert()</a></dt>
<dd><p>This is triggered by an Anomaly being recorded, and inserted into the Anomalies Collection</p>
<ul>
<li>Fetches the anomaly row</li>
<li>Checks for alerting configuration</li>
<li>Sends email, text alert</li>
</ul>
</dd>
<dt><a href="#SimulateSensorFeed">SimulateSensorFeed()</a></dt>
<dd><p>Simulates a sensor feed from a sensor network of temperature sensors
Publishes NUM_MESSAGES messages to TOPIC</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Calibration">Calibration</a></dt>
<dd></dd>
<dt><a href="#Anomaly">Anomaly</a></dt>
<dd></dd>
</dl>

<a name="SEND_GRID_API_URI"></a>

## SEND_GRID_API_URI
Creator: Robert Reinold
Updated: 2017-10-02T00:00:00Z
Version: v2.0
Tags: email, sendgrid, marketing, mail, api, rest, http

Usage:
1. Create a free SendGrid Account. 
2. Log into your SendGrid account, and view the Settings > API Keys tab. Create an API Key with full access to "Mail Send" rights.
3. Replace <SEND_GRID_API_KEY> with SendGrid API key
4. Replace <ORIGIN_EMAIL_ADDRESS> with your desired email address. This will be the 'sender' of the email.
5. Add 'SendGridEmail' as a dependency to your code services (Settings > Requires > Add)

**Kind**: global variable  
<a name="AnomalyDetection"></a>

## AnomalyDetection()
Detects Anomalies with Moving Median Decomposition
See attached whitepaper for Anomaly Detection for Predictive Maintenance
https://files.knime.com/sites/default/files/inline-images/Anomaly_Detection_Time_Series_final.pdf

Run a self-training anomaly detection algorithm against a given dataset

**Kind**: global function  
**Parameter**: <code>number[]</code> dataset array of numbers  

* [AnomalyDetection()](#AnomalyDetection)
    * [~calibrate()](#AnomalyDetection..calibrate)
    * [~detect()](#AnomalyDetection..detect) ⇒ [<code>Array.&lt;Anomaly&gt;</code>](#Anomaly)
    * [~getCalibration()](#AnomalyDetection..getCalibration) ⇒ [<code>Calibration</code>](#Calibration)

<a name="AnomalyDetection..calibrate"></a>

### AnomalyDetection~calibrate()
Use precomputed anomaly detection calibration profile
This can be used to speed up performance for real-time anomaly detection

**Kind**: inner method of [<code>AnomalyDetection</code>](#AnomalyDetection)  
<a name="AnomalyDetection..detect"></a>

### AnomalyDetection~detect() ⇒ [<code>Array.&lt;Anomaly&gt;</code>](#Anomaly)
Run the algorithm against the provided dataset.

Note: This is the most computation-heavy method in this library

**Kind**: inner method of [<code>AnomalyDetection</code>](#AnomalyDetection)  
**Returns**: [<code>Array.&lt;Anomaly&gt;</code>](#Anomaly) - anomalies - the list of anomalies found in dataset  
**Parameter**: <code>number</code> strictnessOverride (optional) Set the strictness of the anomaly detection  
<a name="AnomalyDetection..getCalibration"></a>

### AnomalyDetection~getCalibration() ⇒ [<code>Calibration</code>](#Calibration)
Fetch the computed anomaly detection calibration parameters

**Kind**: inner method of [<code>AnomalyDetection</code>](#AnomalyDetection)  
**Returns**: [<code>Calibration</code>](#Calibration) - calibration  
<a name="Twilio"></a>

<a name="DetectAnomaly"></a>

## DetectAnomaly() ⇒ <code>AnomalyVisual</code>
Detects an anomaly in the last X MQTT Messages
Uses 'AnomalyConfiguration' config to check for a key in the JSON of each message.
ex. 'sensor_key' will be set to 'temperature', so we know to pull the temperature key/value pair from a mqtt message like this:
{"temperature":40,"humidity":31}

**Kind**: global function  
**Returns**: <code>AnomalyVisual</code> - data to visualize this anomaly detection  
<a name="ExampleDetectAnomaly"></a>

## ExampleDetectAnomaly() ⇒ [<code>Array.&lt;Anomaly&gt;</code>](#Anomaly)
Example logic for detecting anomalies in a dataset of sensor values

**Kind**: global function  
**Returns**: [<code>Array.&lt;Anomaly&gt;</code>](#Anomaly) - anomalies  
<a name="SaveAnomalyConfiguration"></a>

## SaveAnomalyConfiguration()
Ingests updated anomaly configuration, and saves to AnomalyConfiguration Collection

**Kind**: global function  
**Parameter**: <code>AnomalyConfiguration</code> anomalyConfiguration - map of settings to update  
<a name="SendAlert"></a>

## SendAlert()
This is triggered by an Anomaly being recorded, and inserted into the Anomalies Collection

- Fetches the anomaly row
- Checks for alerting configuration
- Sends email, text alert

**Kind**: global function  
<a name="SimulateSensorFeed"></a>

## SimulateSensorFeed()
Simulates a sensor feed from a sensor network of temperature sensors
Publishes NUM_MESSAGES messages to TOPIC

**Kind**: global function  
<a name="Calibration"></a>

## Calibration
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| min | <code>number</code> | min value within threshold |
| max | <code>number</code> | max value within threshold |
| strictness | <code>number</code> | how strict the threshold is against the dataset |
| medians | <code>number</code> | intermediary dataset representing the moving medians |
| pointsPerWindow | <code>number</code> | calibration, number of points per processing window. may be increased for larger datasets |
| numWindows | <code>number</code> | calibration metric derived from pointsPerWindow |

<a name="Anomaly"></a>

## Anomaly
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | index in the provided dataset |
| value | <code>number</code> | value of the data point that is detected as an anomaly |

