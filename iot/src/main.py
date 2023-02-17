import network
import time
from machine import Pin
import socket
import machine
import os
import ubinascii

# printing device identity
print("Device identity :")   
print("Unique Id: ", ubinascii.hexlify(machine.unique_id()).decode('utf-8'))
print("Description:",os.uname())
print("\n")

# Connecting with the wifi

# best practice is to put it in the boot.py
sta_if = network.WLAN(network.STA_IF)
ap_if = network.WLAN(network.AP_IF)

if not sta_if.isconnected():         
    print('connecting to network...')        
    sta_if.active(True)         
    sta_if.connect('WIFI-SSID', 'WIFI-PASSWORD')
    while not sta_if.isconnected():
        print("waiting for wifi connection...",sta_if.status())
        time.sleep(1)

# Printing networking information
print("Device network details:")      
print("station mode = [is_connected]",sta_if.isconnected(),"[is_active]", sta_if.active(),"[if_config]",sta_if.ifconfig())
print("ap mode = [is_active]", ap_if.active(),"[if_config]",ap_if.ifconfig())
wlan_mac = sta_if.config('mac')
print("device MAC",ubinascii.hexlify(wlan_mac).decode())
print("\n")

# Controling LED
led = Pin(2, Pin.OUT)
addr = socket.getaddrinfo("0.0.0.0", 8666)[0][-1]
s = socket.socket()
s.bind(addr)
s.listen(1)
print("listening on", addr)

while True:
    print("waiting for client...")
    cl, addr = s.accept()
    print("client connected from", addr)
    cl_file = cl.makefile("rwb", 0)
    while True:
        command = cl_file.readline().decode('utf-8').strip()
        print("command = " , command)
        if command == "on":
            led.off()
            cl.send("ok\n")
        elif command == "off":
            led.on()
            cl.send("ok\n")
        else:
            break;
    
    cl.close();
