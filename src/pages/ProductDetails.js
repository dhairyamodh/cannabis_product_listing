import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Loading from "../components/Loading";
import Bg from "../assets/images/bg.jpg";

const ProductImg = styled.img({
    width: 200,
    height: 200,
    padding: 10,
    background: "white",
    boxShadow: "inset -5px -5px 10px #bebebe,inset 5px 5px 20px #ffffff",

    objectFit: "cover",
    borderRadius: 30,
    marginTop: -30,
    marginLeft: 30,
    marginBottom: 30,
    marginRight: 30,
});

const ProductCard = styled.div({
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",

    marginBottom: 50,
    borderRadius: 20,
    background: "linear-gradient(145deg, #d8d8d8, #f0f0f0)",

    boxShadow: "15px 15px 60px #bebebe,-10px -10px 20px #ffffff",
});

const ProductContent = styled.div({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "30px 0px",
});

const ProductInnerContent = styled.div({
    width: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
});

const ProductTitle = styled.h5({
    color: "#444",
    fontWeight: 700,
    textTransform: "capitalize",
    fontSize: 25,
    //   marginBottom: 20,
});

const ProductBrand = styled.p({
    color: "#444",
    fontSize: 20,
    marginRight: 10,
    fontWeight: 500,
});

const ProductStrain = styled.p({
    background: "#defceb",
    padding: "4px 8px",
    borderRadius: 50,
    color: "#044f24",
    fontSize: 18,
    fontWeight: 600,
    textTransform: "uppercase",
});

const ProductBrandContainer = styled.div({
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
});

const ProductOtherContainer = styled.div({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

const ProductOther = styled.div({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    fontWeight: 600,
});

const ProductOtherTitle = styled.span({
    fontWeight: 700,
    color: "#858585",
    fontSize: 16,
});

const ProductOtherSubTitle = styled.span({
    color: "#035e29",
    fontSize: 18,
});

const ProductPriceContent = styled.div({
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    fontWeight: 700,
});

const ProductPrice = styled.span({
    fontSize: 27,
    fontWeight: 800,

    padding: "10px 0px 10px 30px",
    // color: "#308254",
    color: "#333",

    borderRadius: 10,
});

const ProductWeight = styled.span({
    fontSize: 17,
    paddingLeft: 10,
    // color: "#308254",
    color: "#000",

});

const ProductDetails = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [localPage, setLocalPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const { cateName } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const URL = `/graphql?operationName=FilteredProducts&variables=%7B%22includeCannabinoids%22%3Afalse%2C%22showAllSpecialProducts%22%3Afalse%2C%22productsFilter%22%3A%7B%22dispensaryId%22%3A%22609c48195960d500bb8eda47%22%2C%22pricingType%22%3A%22rec%22%2C%22strainTypes%22%3A%5B%5D%2C%22subcategories%22%3A%5B%5D%2C%22Status%22%3A%22Active%22%2C%22removeProductsBelowOptionThresholds%22%3Atrue%2C%22types%22%3A%5B%22${cateName}%22%5D%2C%22useCache%22%3Afalse%2C%22sortDirection%22%3A1%2C%22sortBy%22%3Anull%2C%22bypassOnlineThresholds%22%3Afalse%2C%22isKioskMenu%22%3Afalse%7D%2C%22page%22%3A${page}%2C%22perPage%22%3A${rowsPerPage}%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22b6ff0c53f33a7971a20ae49e81ab24b70c0095add648534e1c6a140943759883%22%7D%7D`;
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
                    const data = res.data.data.filteredProducts.products;
                    if (data.length > 0) {
                        setProducts([...products, ...data]);
                        setPage(page + 1);
                    } else {
                        setLoading(false);
                    }
                }
            })
            .catch((err) => {
                setError("An error occured");
            });
    };
    if (!loading)
        setTimeout(() => {
            if (products.length >= 20) {
                const totalPages = products.length / rowsPerPage;
                console.log(
                    "totalPages",
                    products.length,
                    Math.ceil(totalPages),
                    localPage,
                    localPage === totalPages
                );
                if (localPage === Math.ceil(totalPages) - 1) {
                    setLocalPage(0);
                } else {
                    setLocalPage(localPage + 1);
                }
                // setLocalPage(page + 1)
            }
        }, 15000);
    React.useEffect(() => {
        loading && getData();
    }, [cateName, page]);
    console.log(
        "products",
        products.length,
        "localPage * rowsPerPage",
        localPage * rowsPerPage,
        "localPage * rowsPerPage + rowsPerPage",
        localPage * rowsPerPage + rowsPerPage
    );
    return (
        <div style={{ background: "#e0e0e0", padding: 50 }}>
            <Row>
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
                    products
                        ?.slice(
                            localPage * rowsPerPage,
                            localPage * rowsPerPage + rowsPerPage
                        )
                        .map((item, index) => {
                            return (
                                <Col sm={12} md={6}>
                                    <ProductCard>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                width: "100%",
                                                borderRadius: 20,
                                            }}
                                        >
                                            <ProductImg src={item.Image} />
                                            <ProductContent>
                                                <ProductTitle>{item.cName}</ProductTitle>
                                                <ProductInnerContent>
                                                    <ProductBrandContainer>
                                                        <ProductBrand>{item.brandName}</ProductBrand>
                                                        <ProductStrain>{item.strainType}</ProductStrain>
                                                    </ProductBrandContainer>

                                                    <ProductOtherContainer>
                                                        <ProductOther>
                                                            <ProductOtherTitle>THC</ProductOtherTitle>
                                                            <ProductOtherSubTitle>
                                                                {item.THCContent.range
                                                                    .map((range) => range + "%")
                                                                    .join(" - ")}
                                                            </ProductOtherSubTitle>
                                                        </ProductOther>
                                                        <ProductOther style={{ marginLeft: 20 }}>
                                                            <ProductOtherTitle>CBD</ProductOtherTitle>
                                                            <ProductOtherSubTitle>
                                                                {item.CBDContent.range
                                                                    .map((range) => range + "%")
                                                                    .join(" - ")}
                                                            </ProductOtherSubTitle>
                                                        </ProductOther>
                                                    </ProductOtherContainer>
                                                </ProductInnerContent>
                                            </ProductContent>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                background: "#00ff70",
                                                width: "100%",
                                                borderRadius: '0 0 20px 20px',
                                                "boxShadow": "inset 20px 20px 60px #d8d8d8, inset -20px -20px 60px #ffffff"
                                            }}
                                        >
                                            {item.recPrices.map((price, index) => {
                                                return (
                                                    <ProductPrice>
                                                        ${price}
                                                        <ProductWeight>
                                                            ({item.Options[index]})
                                                        </ProductWeight>
                                                    </ProductPrice>
                                                );
                                            })}
                                        </div>

                                        {/* <ProductImg src={item.Image} />
                    <ProductContent>
                      <ProductTitle>{item.cName}</ProductTitle>
                      <ProductInnerContent>
                        <ProductBrandContainer>
                          <ProductBrand>{item.brandName}</ProductBrand>
                          <ProductStrain>{item.strainType}</ProductStrain>
                        </ProductBrandContainer>
                        <ProductOtherContainer>
                          <ProductOther>
                            <ProductOtherTitle>THC</ProductOtherTitle>
                            <ProductOtherSubTitle>
                              {item.THCContent.range
                                .map((range) => range + "%")
                                .join(" - ")}
                            </ProductOtherSubTitle>
                          </ProductOther>
                          <ProductOther>
                            <ProductOtherTitle>CBD</ProductOtherTitle>
                            <ProductOtherSubTitle>
                              {item.CBDContent.range
                                .map((range) => range + "%")
                                .join(" - ")}
                            </ProductOtherSubTitle>
                          </ProductOther>
                        </ProductOtherContainer>
                      </ProductInnerContent>
                    </ProductContent>
                    <ProductPriceContent>
                      {item.recPrices.map((price, index) => {
                        return (
                          <ProductPrice>
                            {price}
                            <ProductWeight>
                              ({item.Options[index]})
                            </ProductWeight>
                          </ProductPrice>
                        );
                      })}
                    </ProductPriceContent> */}
                                    </ProductCard>
                                </Col>
                            );
                        })
                ) : (
                    <Loading />
                )}
            </Row>
        </div>
    );
};

export default ProductDetails;