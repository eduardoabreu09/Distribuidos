// source: sensor.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.CommandMessage', null, global);
goog.exportSymbol('proto.CommandMessage.CommandType', null, global);
goog.exportSymbol('proto.Sensor', null, global);
goog.exportSymbol('proto.Sensor.SensorType', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Sensor = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Sensor, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Sensor.displayName = 'proto.Sensor';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.CommandMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.CommandMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.CommandMessage.displayName = 'proto.CommandMessage';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Sensor.prototype.toObject = function(opt_includeInstance) {
  return proto.Sensor.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Sensor} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Sensor.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: (f = jspb.Message.getField(msg, 1)) == null ? undefined : f,
    id: (f = jspb.Message.getField(msg, 2)) == null ? undefined : f,
    state: (f = jspb.Message.getOptionalFloatingPointField(msg, 3)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Sensor}
 */
proto.Sensor.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Sensor;
  return proto.Sensor.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Sensor} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Sensor}
 */
proto.Sensor.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.Sensor.SensorType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setState(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Sensor.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Sensor.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Sensor} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Sensor.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {!proto.Sensor.SensorType} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeFloat(
      3,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.Sensor.SensorType = {
  TEMPERATURE: 0,
  LIGHT: 1,
  LUMINOSITY: 2,
  GAS: 3
};

/**
 * required SensorType type = 1;
 * @return {!proto.Sensor.SensorType}
 */
proto.Sensor.prototype.getType = function() {
  return /** @type {!proto.Sensor.SensorType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {!proto.Sensor.SensorType} value */
proto.Sensor.prototype.setType = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 */
proto.Sensor.prototype.clearType = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Sensor.prototype.hasType = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * required int32 id = 2;
 * @return {number}
 */
proto.Sensor.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.Sensor.prototype.setId = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 */
proto.Sensor.prototype.clearId = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Sensor.prototype.hasId = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * required float state = 3;
 * @return {number}
 */
proto.Sensor.prototype.getState = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/** @param {number} value */
proto.Sensor.prototype.setState = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 */
proto.Sensor.prototype.clearState = function() {
  jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Sensor.prototype.hasState = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.CommandMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.CommandMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.CommandMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CommandMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    command: (f = jspb.Message.getField(msg, 1)) == null ? undefined : f,
    parameter: (f = msg.getParameter()) && proto.Sensor.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.CommandMessage}
 */
proto.CommandMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.CommandMessage;
  return proto.CommandMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.CommandMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.CommandMessage}
 */
proto.CommandMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.CommandMessage.CommandType} */ (reader.readEnum());
      msg.setCommand(value);
      break;
    case 2:
      var value = new proto.Sensor;
      reader.readMessage(value,proto.Sensor.deserializeBinaryFromReader);
      msg.setParameter(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.CommandMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.CommandMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.CommandMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CommandMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {!proto.CommandMessage.CommandType} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getParameter();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.Sensor.serializeBinaryToWriter
    );
  }
};


/**
 * @enum {number}
 */
proto.CommandMessage.CommandType = {
  GET_STATE: 0,
  SET_STATE: 1,
  SENSOR_STATE: 2
};

/**
 * required CommandType command = 1;
 * @return {!proto.CommandMessage.CommandType}
 */
proto.CommandMessage.prototype.getCommand = function() {
  return /** @type {!proto.CommandMessage.CommandType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {!proto.CommandMessage.CommandType} value */
proto.CommandMessage.prototype.setCommand = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 */
proto.CommandMessage.prototype.clearCommand = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.CommandMessage.prototype.hasCommand = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Sensor parameter = 2;
 * @return {?proto.Sensor}
 */
proto.CommandMessage.prototype.getParameter = function() {
  return /** @type{?proto.Sensor} */ (
    jspb.Message.getWrapperField(this, proto.Sensor, 2));
};


/** @param {?proto.Sensor|undefined} value */
proto.CommandMessage.prototype.setParameter = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.CommandMessage.prototype.clearParameter = function() {
  this.setParameter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.CommandMessage.prototype.hasParameter = function() {
  return jspb.Message.getField(this, 2) != null;
};


goog.object.extend(exports, proto);
