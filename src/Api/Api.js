import { baseUrl } from "./Baseurl";


// POST API without headers
export const postapiwithoutheader = async (endpoint, requestdata) => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestdata),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error:", error);
        return { error: 1, message: "Request failed" };
    }
};
export const Postwithformdata = async (endpoint, requestdata, token) => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: "POST",
            body: requestdata, // Use FormData directly
            headers: token ? { Authorization: `Bearer ${token}` } : {}, // Only add Authorization if token is provided
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error:", error);
        return { error: 1, message: "Request failed" };
    }
};

// POST API with headers
export const postwithheader = async (endpoint, formdata) => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formdata),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error:", error);
        return { error: 1, message: "Request failed" };
    }
};


// GET API with headers
export const getwithheader = async (endpoint) => {
    const token = localStorage.getItem("token")

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error:", error);
        return { error: 1, message: "Request failed" };
    }
};
// GET API Without header
export const getWithoutHeader = async (endpoint) => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: "GET",
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error:", error);
        return { error: 1, message: "Request failed" };
    }
};
// PUT API with headers
export const putwithformdata = async (endpoint, formdata, token) => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: "PUT",
            body: formdata, // Use FormData directly
            headers: token ? { Authorization: `Bearer ${token}` } : {}, // Only add Authorization if token is provided
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error:", error);
        return { error: 1, message: "Request failed" };
    }
};


// PUT API with headers
export const putwithheader = async (endpoint, formdata, token) => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formdata),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error:", error);
        return { error: 1, message: "Request failed" };
    }
};

// PUT API with out headers
export const putWithJson = async (endpoint, formdata) => {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formdata),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error:", error);
        return { error: 1, message: "Request failed" };
    }
};

// DELETE API without data
export const deleteapi = async (endpoint) => {
    let token = localStorage.getItem("token")
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error:", error);
        return { error: 1, message: "Request failed" };
    }
};

// DELETE API with request data
export const deleteapiwithdata = async (endpoint, requestdata, token) => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestdata),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error:", error);
        return { error: 1, message: "Failed to delete data" };
    }
};
