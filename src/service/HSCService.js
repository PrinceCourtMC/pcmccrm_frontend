export default class HSCService {
    // getAllUser() {
    //     return fetch('http://localhost:8081/pcmchscjourney-api/public/api/getAllUser')
    //         .then((res) => res.json())
    //         .then((d) => d.data);
    // }

    getAllHSCList(param) {
        return fetch('http://localhost:8081/PCMC_API/api/qmsHSCListAll?' + new URLSearchParams(param))
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getAllKPISetup() {
        return fetch('http://localhost:8081/PCMC_API/api/qmsHSCKpi?time=1703841555&sign=304304a65d616cf77f9f31dad49b397b')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    editKPISetup(id, params) {
        return fetch('http://localhost:8081/PCMC_API/api/qmsHSCKpi/' + id, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify(params)
          })
          .then((res) => res.json())
          .then((d) => d.data);
    }
}
