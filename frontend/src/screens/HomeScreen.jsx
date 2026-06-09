import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Paginate from '../components/Paginate.jsx';
import ProductCarousel from '../components/ProductCarousel.jsx';
import React from 'react';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const page = Number(pageNumber) || 1;

  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber: page });

  return (
    <>
    {! keyword ? (<ProductCarousel />) : (
      <Link to='/' className='btn btn-light mb-4'>
        Go Back
      </Link>
    )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data?.message || error.error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products && data.products.length > 0 ? (
              data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))
            ) : (
              <Col sm={12}>
                <Message variant='info'>No products available</Message>
              </Col>
            )}
          </Row>
          <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''}>
            
          </Paginate>
        </>
      )}
    </>
  );
};

export default HomeScreen;
