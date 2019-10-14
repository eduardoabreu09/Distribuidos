package com.distribuidos;
 
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.Inet4Address;
import java.net.Socket;
import java.util.*;
 
public class TCPClientModule extends ReactContextBaseJavaModule {

    private Socket socket;
    private String ipAddress;
    private int port;
    private boolean connected;
 
    public TCPClientModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
        connected = false;
        port = 0;
    }
 
    @Override
    //getName is required to define the name of the module represented in JavaScript
    public String getName() { 
        return "TCPClient";
    }

    @ReactMethod
    public void connect(Callback errorCallback, Callback successCallback, String ip, int port) {
        try {
            socket = new Socket(ip, port);
            connected = true;
            this.ipAddress = ip;
            this.port = port;
            successCallback.invoke(true);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }
 
    @ReactMethod
    public void sendMessage(Callback errorCallback, Callback successCallback, byte[] message) {
        try {
            OutputStream os = socket.getOutputStream();
            os.write(message);
            InputStream is = socket.getInputStream();
            byte[] response = new byte[1024];
            is.read(response);
            successCallback.invoke(response);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void disconnect(Callback errorCallback, Callback successCallback) {
        try {
            socket.close();
            connected = false;
            ipAddress = null;
            port = 0;
            successCallback.invoke(true);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void isConnected(Callback errorCallback, Callback successCallback) {
        try {
            if (this.connected == true) {
                successCallback.invoke(true);
            }else {
                successCallback.invoke(false);
            }
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}