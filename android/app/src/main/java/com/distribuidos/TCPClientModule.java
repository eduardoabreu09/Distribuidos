package com.distribuidos;
 
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.Inet4Address;
import java.net.Socket;
import java.util.*;
import java.nio.charset.StandardCharsets;

 
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
    public void connect(String ip,int port,Callback errorCallback, Callback successCallback) {
        try {
            socket = new Socket();
            socket.connect(new InetSocketAddress(ip, port), 5000);
            connected = true;
            this.ipAddress = ip;
            successCallback.invoke(true);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }
 
    @ReactMethod
    public void sendMessage(ReadableArray message, Callback errorCallback, Callback successCallback) {
        try {
            OutputStream os = socket.getOutputStream();
            byte[] messageByte = new byte[message.size()];
            for (int i = 0; i < message.size(); i++){
                messageByte[i] = (byte)message.getInt(i);
            }
            os.write(messageByte);
            InputStream is = socket.getInputStream();
            byte[] response = new byte[1024];
            int size = is.read(response);
            byte[] b = new byte[size];
            for (int i = 0; i < size; i++){
                b[i] = response[i];
            }
            int[] bInt = new int[size];
            for (int i = 0; i < size; i++){
                bInt[i] = b[i];
            }
            String responseStr = getByteString(b);
            successCallback.invoke(responseStr);
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

    public String getByteString(byte[] bytes){
        String str = "/";
        for (int i = 0; i < bytes.length; i++){
            str += Integer.toString(bytes[i]);
            str += "/";
        }

        return str;
    }
}