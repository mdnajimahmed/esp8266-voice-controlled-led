# Demo
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/DlywE2AIaYo/0.jpg)](https://www.youtube.com/watch?v=DlywE2AIaYo)

# esp8266-voice-controlled-led
A fun IOT project to control an esp8266 IOT device using voice command

## Installing the driver
- https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers

## Micropython IDE (beginner friendly)
- https://thonny.org/

## Installing micropython using Thonny
- https://www.youtube.com/watch?v=fmgQ8Dcg9uM&t=2s
- https://randomnerdtutorials.com/getting-started-thonny-micropython-python-ide-esp32-esp8266/

## Micropython doc
- https://docs.micropython.org/en/latest/esp8266/tutorial/intro.html

## How it works
- The front end is written in React because it is very easy to bootstrap a ReactJS project using `npx create-react-app` command and start developing UI! 
- The front end uses a library called `react-speech-kit` that helps to do the voice-to-text conversion. I followed this blog `https://www.commoninja.com/blog/how-to-convert-speech-to-text-in-react-with-the-react-speech-kit`. Here is another nice blog on this - `https://blog.openreplay.com/make-your-app-speak-with-react-speech-kit/`
- When a command is received at the front end, it is sent to the backend for processing. The backend is a REST API written in golang. The backend receives the command over HTTP and sends the command to the ESP8266 device via TCP. Go code is acting as a http listener for the React App and a TCP client to the ESP8266 device, a gateway to the device to send command from the ReactApp.
- Finally there is a tcp listener written in micropython which is running in the ESP8266 device. The tcp listener receives the command and executes it on the hardware.

## Tips:
- Don't use cheap charing cable to connect, use proper data cable. I had no idea there is a difference. Apparently there is a difference (https://www.dignited.com/50330/usb-data-cable-vs-usb-charging-cable/) which I did not know! This blog helped (https://github.com/esp8266/Arduino/issues/3551)
- Dealing with bare metal is hard, lots of trial and error , guesswork, reading and searching solution which can be a bit challenging , so be patient. **Happy IOTing....**
