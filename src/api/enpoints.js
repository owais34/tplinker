import { STUN_URL } from "../config/config";

let CLIENT_ID = "dummy";
let CLIENT_SECRET = "dummy";
let ACCESS_TOKEN = " dummy";

const setApiAccessParameters = ({ client_id, client_secret, access_token }) => {
  CLIENT_ID = client_id;
  CLIENT_SECRET = client_secret;
  ACCESS_TOKEN = access_token;
};

const baseURL = "https://aps1-openapi.tplinknbu.com/v1";
const endpoints = {
  authorization: {
    oAuthScheme: function (client_id, state, redirect_url) {
      // returns redirect authorized url : <REDIRECT_URL>?code=AUTHORIZATION_CODE&state=CLIENT_STATE
      let keyGenString = "abcdefghijklmnopqrtuvwxyz";
      keyGenString = keyGenString + keyGenString.toUpperCase() + "0123456789";
      state = "";
      for (let i = 0; i < 24; i++) {
        state =
          state +
          keyGenString.charAt(Math.floor(Math.random() * keyGenString.length));
      }
      const url =
        baseURL +
        `/oauth/authorize?client_id=${client_id}&response_type=code&scope=all&state=${state}&redirect_url=${redirect_url}`;
      return { type: "GET", url };
    },
    customisedAuth: function (client_id, client_secret, PARTNER_CUSTOMER_ID) {
      const url =
        baseURL +
        `/getLinkedAccount?client_id=${client_id}&client_secret=${client_secret}&id=${PARTNER_CUSTOMER_ID}`;

      return { type: "POST", url };
    },
    requestToken: function (
      client_id,
      client_secret,
      code, //authorization code received from oauthscheme request can be treated as password
      grant_type = "code"
    ) {
      const url = baseURL + `/oauth/token`;
      const body = {
        client_id,
        client_secret,
        code,
        grant_type,
      };
      return { type: "POST", url, body };
    },
    refreshToken: function (
      client_id,
      client_secret,
      code,
      grant_type = "refresh_token"
    ) {
      const url = baseURL + `/oauth/token`;
      const body = {
        client_id,
        CLIENT_SECRET,
        code,
        grant_type,
      };
      return { type: "POST", url, body };
    },
  },
  generalDeviceApi: {
    getBindToken: function () {
      const url =
        baseURL +
        `/getBindToken?client_id=${CLIENT_ID}&api_key=${CLIENT_SECRET}&token=${ACCESS_TOKEN}`;
      return { type: "POST", url };
    },
    getDeviceList: function () {
      const url =
        baseURL +
        `/getDeviceList?client_id=${CLIENT_ID}&api_key=${CLIENT_SECRET}&token=${ACCESS_TOKEN}`;
      return { type: "POST", url };
    },
    getLocalAccessTokenForDevices: function (deviceIds) {
      const url =
        baseURL +
        `/getLocalAccessToken?client_id=${CLIENT_ID}&api_key=${CLIENT_SECRET}&token=${ACCESS_TOKEN}`;
      const body = {
        deviceIds,
      };
      return { type: "POST", url, body };
    },
    getModuleList: function (model, id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getModuleList",
      };
      return { type: "POST", url, body };
    },
    getLanguage: function (model, id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getLanguage",
      };

      return { type: "POST", url, body };
    },
    setLanguage: function (model, id, language) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "setLanguage",
        params: {
          language,
        },
      };
      return { type: "POST", url, body };
    },
    getPrivacyMode: function (model, id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getPrivacyMode",
      };
      return { type: "POST", url, body };
    },

    setPrivacyMode: function (model, id, enabled) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "setPrivacyMode",
        params: {
          enabled,
        },
      };
      return { type: "POST", url, body };
    },
    getDeviceAlias: function (model, id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getDeviceAlias",
      };
      return { type: "POST", url, body };
    },
    setDeviceAlias: function (model, id, alias) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "setDeviceAlias",
        params: {
          alias,
        },
      };
      return { type: "POST", url, body };
    },
    setSoftReset: function (model, id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "setSoftReset",
      };
      return { type: "POST", url, body };
    },
    getTimezone: function (model, id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getTimezone",
      };
      return { type: "POST", url, body };
    },
    setTimezone: function (model, id, timezone, area) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "setTimezone",
        params: {
          timezone,
          area,
        },
      };
      return { type: "POST", url, body };
    },
    getSpeakerVolume: function (model, id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getSpeakerVolume",
      };
      return { type: "POST", url, body };
    },
    setSpeakerVolume: function (model, id, volume) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "setSpeakerVolume",
        params: {
          volume,
        },
      };
      return { type: "POST", url, body };
    },
    getMicrophoneVolume: function (model, id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getMicrophoneVolume",
      };
      return { type: "POST", url, body };
    },
    setMicrophoneVolume: function (model, id, volume) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "setMicrophoneVolume",
        params: {
          volume,
        },
      };
      return { type: "POST", url, body };
    },
    getResolution: function (model, id, channel = 0) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getResolution",
        params: {
          channel,
        },
      };
      return { type: "POST", url, body };
    },
    setResolution: function (model, id, resolution, channel = 0) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "setResolution",
        params: {
          channel,
          resolution,
        },
      };
      return { type: "POST", url, body };
    },
    getVideoCapability: function (model, id, channel = 0) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getVideoCapability",
        params: {
          channel,
        },
      };
      return { type: "POST", url, body };
    },
    getDayNightMode: function (model, id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getDayNightMode",
      };
      return { type: "POST", url, body };
    },
    setDayNightMode: function (model, id, mode) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "setDayNightMode",
        params: {
          mode,
        },
      };
      return { type: "POST", url, body };
    },
    formatSdCard: function (model, id, card_index) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "formatSdCard",
        params: {
          card_index,
        },
      };
      return { type: "POST", url, body };
    },
    getSdCardStatus: function (model, id, card_index) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getSdCardStatus",
        params: {
          card_index,
        },
      };
      return { type: "POST", url, body };
    },
    getMotionDetectionSwitch: function (model, id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getMotionDetectionSwitch",
      };
      return { type: "POST", url, body };
    },
    setMotionDetectionSwitch: function (model, id, enabled) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "setMotionDetectionSwitch",
        params: {
          enabled,
        },
      };
      return { type: "POST", url, body };
    },
    getAlertConfig: function (model, id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getAlertConfig",
      };
      return { type: "POST", url, body };
    },
    setAlertConfig: function (
      model,
      id,
      alarm_audio_type,
      enabled,
      alarm_mode
    ) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getAlertConfig",
        params: {
          enabled,
          alarm_audio_type,
          alarm_mode,
        },
      };
      return { type: "POST", url, body };
    },
    getNotificationSwitch: function (model, id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getNotificationSwitch",
      };
      return { type: "POST", url, body };
    },
    setNotificationSwitch: function (model, id, enabled) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getNotificationSwitch",
        params: {
          enabled,
        },
      };
      return { type: "POST", url, body };
    },
    motorMove: function (model, id, x_coord, y_coord) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "motorMove",
        params: {
          x_coord,
          y_coord,
        },
      };
      return { type: "POST", url, body };
    },
    cruiseMove: function (model, id, coord) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "cruiseMove",
        params: {
          coord,
        },
      };
      return { type: "POST", url, body };
    },
    stopMove: function (model, id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "stopMove",
      };
      return { type: "POST", url, body };
    },
    getPresetPoint: function (model, id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getPresetPoint",
      };
      return { type: "POST", url, body };
    },
    setPresetPoint: function (model, id, preset_id, name) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "setPresetPoint",
        params: {
          id: preset_id,
          name,
        },
      };
      return { type: "POST", url, body };
    },
    removePresetPoint: function (model, id, preset_id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "removePresetPoint",
        params: {
          id: preset_id,
        },
      };
      return { type: "POST", url, body };
    },
    gotoPresetPoint: function (model, id, preset_id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "gotoPresetPoint",
        params: {
          id: preset_id,
        },
      };
      return { type: "POST", url, body };
    },
    getThirdAccount: function (model, id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getThirdAccount",
      };
      return { type: "POST", url, body };
    },
    setThirdAccount: function (model, id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "setThirdAccount",
      };
      return { type: "POST", url, body };
    },
    verifyThirdAccount: function (model, id, username, password) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "verifyThirdAccount",
        params: {
          username,
          password,
        },
      };
      return { type: "POST", url, body };
    },
    getUserId: function (model, id) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "getUserId",
      };
      return { type: "POST", url, body };
    },
    searchVideoCalendar: function (model, id, start_date, end_date) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "searchVideoCalendar",
        params: {
          start_date,
          end_date,
        },
      };
      return { type: "POST", url, body };
    },
    searchVideoList: function (
      model,
      id,
      start_time,
      end_time,
      user_id,
      start_index = 0,
      end_index = 19
    ) {
      const url = constructUrlForDeviceControl();
      const body = {
        device: { model, id },
        method: "searchVideoList",
        params: {
          start_time,
          end_time,
          user_id,
          start_index,
          end_index,
        },
      };
      return { type: "POST", url, body };
    },
  },
  streamingUrls: {
    prepareP2PStream: function (deviceId, pub_ip, pub_port, pri_ip, pri_port) {
      const url =
        baseURL + `/prepareP2PStream/${deviceId}` + constructAuthParams();
      const body = {
        version: 1.1,
        app_imp_version: 4,
        pub_ip: pub_ip,
        pub_port: pub_port,
        pri_ip: pri_ip,
        pri_port: pri_port,
        nat_type: 6,
        stun_url: STUN_URL,
      };
      return { type: "POST", url, body };
    },
    isP2PReady: function (deviceId, sid) {
      const url = baseURL + `/isP2PReady/${deviceId}` + constructAuthParams();
      const body = {
        params: {
          sid,
        },
      };
      return { type: "POST", url, body };
    },
    prepareRelayStream: function (deviceId) {
      const url =
        baseURL + `/prepareRelayStream/${deviceId}` + constructAuthParams();
      const body = {
        params: {
          version: 1.3,
          stream_type: 0,
          protocol: 0,
          relay_server: "aps1-relay-dcipc.i.tplinknbu.com",
          relay_port: 8099,
          relay_req_url:
            `/relayservice?deviceId=${deviceId}&type=vide&resolution=VGA`,
          local_req_url: "/stream",
        },
      };
      return {type:"POST",url,body};
    },

    isRelayPrepared: function(deviceId,sid) {
      const url = `/isRelayPrepared/${deviceId}`+constructAuthParams();
      const body = {
        params: {
          sid
        }
      };
      return {type:"POST",url,body};
    }
  },
};

const constructUrlForDeviceControl = () => {
  const url = baseURL + `/device/deviceControl` + constructAuthParams();
  return url;
};

const constructAuthParams = () => {
  return `?client_id=${CLIENT_ID}&api_key=${CLIENT_SECRET}&token=${ACCESS_TOKEN}`;
};

export { baseURL, endpoints ,setApiAccessParameters};
