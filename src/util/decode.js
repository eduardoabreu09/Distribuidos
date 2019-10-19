export function byteStringToByteArray(str){
    var bytes = [];
    for (var i = 0; i < str.length;){
      var j = i + 1;
      var subStr = '';
      while(str[j] != '/' && j < str.length){
        subStr += str[j];
        j += 1;
      }
      if (subStr == '')
        break;
      bytes.push(parseInt(subStr));
      i = j;
    }
    return new Uint8Array(bytes);
  }

export function byteToString(bytes){
    var result = ''
    for(var i = 0; i < bytes.length; i++) {
      result += String.fromCharCode(parseInt(bytes[i], 2));
    }
    return result;
  }

export function convertByte(uint8Array){
    var array = [];

    for (var i = 0; i < uint8Array.byteLength; i++) {
        array[i] = uint8Array[i];
    }

    return array;
  } 