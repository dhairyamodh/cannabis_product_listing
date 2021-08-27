import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "../components/Loading";


const ProductDetails = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const history = useHistory()
    const URL = `/graphql?operationName=DispensaryCategoriesQuery&variables=%7B%22productsFilter%22%3A%7B%22dispensaryId%22%3A%22609c48195960d500bb8eda47%22%2C%22pricingType%22%3A%22rec%22%2C%22Status%22%3A%22Active%22%2C%22removeProductsBelowOptionThresholds%22%3Atrue%2C%22useCache%22%3Atrue%2C%22isKioskMenu%22%3Afalse%7D%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22537c93e54dde4f87ba0623d2fde0a213a6d4690acae1b94b9e35b2b0ac775ae5%22%7D%7D`;
    const getData = async () => {
        await axios(URL, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                accept: "*/*",
            },
            withCredentials: true,
            credentials: "same-origin",
        })
            .then((res) => {
                if (res.status === 200) {
                    const data = res.data.data.filteredProducts.categories;
                    if (data.length > 0) {
                        setCategory(data);
                        setLoading(false);

                    }
                }
            })
            .catch((err) => {
                setError("An error occured");
            });
    };

    React.useEffect(() => {
        loading && getData();
    }, []);

    return (
        <div >
            {error != "" ? (
                <div
                    style={{
                        width: "100%",
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    An Error occured
                </div>
            ) : !loading ? (
                category?.map((item, index) => {
                    return (
                        <Button style={{ marginRight: 20 }} onClick={() => { history.push(`/cannabis_product_listing/${item}`) }} key={index}>{item}</Button>
                    );
                })
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default ProductDetails;