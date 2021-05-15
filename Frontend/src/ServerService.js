import axios from "axios";
// export const BASE_URL = "http://27955b6f6171.ngrok.io";
export const BASE_URL = "https://chiranjeev.herokuapp.com";

class ServerService {
  hospitalLogin(data) {
    return axios.post(BASE_URL + "/Hospital/Login", data);
  }

  hospitalRegistration(data) {
    return axios.post(BASE_URL + "/Hospital/Registration", data);
  }

  hospitalRegistrationOtp(data) {
    return axios.post(BASE_URL + "/Hospital/VerifyOtp", data);
  }

  resendOtp(data) {
    return axios.post(BASE_URL + "/Hospital/ResendOtp", data);
  }

  hospitalList() {
    return axios.get(BASE_URL + "/HospitalsList");
  }

  hospitalSearchList(data) {
    return axios.post(BASE_URL + "/Hospital/City", data);
  }

  hospitalDetails(data, id) {
    return axios.patch(BASE_URL + "/Hospital/details/" + id, data);
  }

  hospitalData(id) {
    return axios.get(BASE_URL + "/Hospital/" + id);
  }

  plasmaRequest(data, id) {
    return axios.post(BASE_URL + "/" + id + "/Request/Plasma", data);
  }

  bedRequest(data, id) {
    return axios.post(BASE_URL + "/" + id + "/Request/Bed", data);
  }

  hospitalHome(id) {
    return axios.get(BASE_URL + "/" + id + "/Request");
  }

  DeleteRequest(id, type) {
    return axios.delete(BASE_URL + "/" + id + "/" + type);
  }

  DonateBeds(data) {
    return axios.post(BASE_URL + "/Donation/Bed", data);
  }

  DonatePlasma(data) {
    return axios.post(BASE_URL + "/Donation/Plasma", data);
  }

  PlasmaDonorList() {
    return axios.get(BASE_URL + "/PlasmaDonorRequests");
  }

  BedDonorList() {
    return axios.get(BASE_URL + "/BedDonorRequests");
  }
}

export default new ServerService();
