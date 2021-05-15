import axios from "axios";
import { trackPromise } from "react-promise-tracker";
// export const BASE_URL = "http://27955b6f6171.ngrok.io";
export const BASE_URL = "https://chiranjeev.herokuapp.com";

class ServerService {
  hospitalLogin(data) {
    return trackPromise(axios.post(BASE_URL + "/Hospital/Login", data));
  }

  hospitalRegistration(data) {
    return trackPromise(axios.post(BASE_URL + "/Hospital/Registration", data));
  }

  hospitalRegistrationOtp(data) {
    return trackPromise(axios.post(BASE_URL + "/Hospital/VerifyOtp", data));
  }

  resendOtp(data) {
    return trackPromise(axios.post(BASE_URL + "/Hospital/ResendOtp", data));
  }

  hospitalList() {
    return trackPromise(axios.get(BASE_URL + "/HospitalsList"));
  }

  hospitalSearchList(data) {
    return trackPromise(axios.post(BASE_URL + "/Hospital/City", data));
  }

  hospitalDetails(data, id) {
    return trackPromise(
      axios.patch(BASE_URL + "/Hospital/details/" + id, data)
    );
  }

  hospitalData(id) {
    return trackPromise(axios.get(BASE_URL + "/Hospital/" + id));
  }

  plasmaRequest(data, id) {
    return trackPromise(
      axios.post(BASE_URL + "/" + id + "/Request/Plasma", data)
    );
  }

  bedRequest(data, id) {
    return trackPromise(axios.post(BASE_URL + "/" + id + "/Request/Bed", data));
  }

  hospitalHome(id) {
    return trackPromise(axios.get(BASE_URL + "/" + id + "/Request"));
  }

  DeleteRequest(id, type) {
    return trackPromise(axios.delete(BASE_URL + "/" + id + "/" + type));
  }

  DonateBeds(data) {
    return trackPromise(axios.post(BASE_URL + "/Donation/Bed", data));
  }

  DonatePlasma(data) {
    return trackPromise(axios.post(BASE_URL + "/Donation/Plasma", data));
  }

  PlasmaDonorList() {
    return trackPromise(axios.get(BASE_URL + "/PlasmaDonorRequests"));
  }

  BedDonorList() {
    return trackPromise(axios.get(BASE_URL + "/BedDonorRequests"));
  }

  HospitalBedRequests() {
    return trackPromise(axios.get(BASE_URL + "/HospitalBedRequests"));
  }

  HospitalPlasmaRequests() {
    return trackPromise(axios.get(BASE_URL + "/HospitalPlasmaRequests"));
  }
}

export default new ServerService();
