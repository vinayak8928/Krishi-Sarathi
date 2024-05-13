import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import Message from './../../../components/Message/Message'
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import FormContainer from "../../components/FormContainer/FormContainer";
import {
  listLendMachineProducts,
  deleteLendMachineProduct,
  createLendMachine,
} from "../../actions/productLendMachinesActions";
import {
  MACHINE_CREATE_RESET,
  MACHINE_UPDATE_RESET,
} from "../../constants/productConstants";
import {
  listLendMachineProductsDetails,
  updateLendMachine,
} from "../../actions/productLendMachinesActions";
import Meta from "../../components/Helmet/Meta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const SeedListEdit = ({ match }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [seller, setSeller] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [machine_power, setMachine_power] = useState("");
  const [uploading, setUploading] = useState(false);

  const productId = match.params.id;

  const dispatch = useDispatch();
  let history = useHistory();

  const productLendMachinesList = useSelector(
    (state) => state.productLendMachinesList
  );
  const {
    loading: loadingMachine,
    error: errorMachine,
    productLendMachines,
  } = productLendMachinesList;

  const productLendMachinesDelete = useSelector(
    (state) => state.productLendMachinesDelete
  );
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productLendMachinesDelete;

  const LendMachinesCreate = useSelector((state) => state.LendMachinesCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: productCreate,
  } = LendMachinesCreate;

  const productLendMachinesDetails = useSelector(
    (state) => state.productLendMachinesDetails
  );
  const { loading, error } = productLendMachinesDetails;

  const LendMachinesUpdate = useSelector((state) => state.LendMachinesUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = LendMachinesUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    description: "",
    category: "",
    price: 0,
    countInStock: 0,
  });

  // useEffect(() => {
  //         if (successUpdate) {
  //             // dispatch({ type: SEED_UPDATE_RESET })
  //             history.push('/farmers')
  //         }
  // }, [history, productSeed, dispatch, productId, successUpdate])

  useEffect(() => {
    dispatch({ type: MACHINE_CREATE_RESET });
    if (!userInfo) {
      history.push("/login");
    } else {
      if (successCreate) {
        history.push(`/admin/productlist/machine/${productCreate._id}/edit`);
      } else {
        if (successUpdate) {
          dispatch({ type: MACHINE_UPDATE_RESET });
          history.push("/farmers");
        }
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    productCreate,
  ]);

  const createProductHandler = async (e) => {
    e.preventDefault();

    const { name, image, description, category, price, countInStock } =
      newProduct; // Access state values

    try {
      // dispatch(createSeedProducts())
      dispatch(
        updateLendMachine({
          _id: match.params.id,
          name,
          image,
          description,
          category,
          price,
          countInStock,
        })
      );
      history.push(`/admin/productlist/machine/${match.params.id}`); // Redirect on success
    } catch (error) {
      console.error(error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(
      updateLendMachine({
        _id: productId,
        name,
        image,
        price,
        seller,
        description,
        category,
        quantity,
        machine_power,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      console.log("Uploaded data:", data);

      // setImage(data)
      setNewProduct({
        ...newProduct,
        image: data,
      });
      // newProduct.image({ ...newProduct, data: e.target.value})
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const createMachineProductHandler = () => {
    console.log(userInfo);
    dispatch(createLendMachine());
  };

  return (
    <Container style={{ marginBottom: "50px", marginTop: "12px" }}>
      <Meta title="Krishi Sarathi | Supplier" />
      <FormContainer className="text-right">
        {/* <h2 style={{ marginTop: '120px', textAlign: 'center' }}>Lend Machines</h2> */}
        <h1
          className="title"
          style={{
            fontWeight: "bold",
            marginTop: "120px",
            textAlign: "center",
          }}>
          Lend Machines
        </h1>

        <div className="button-container">
          <Link to="/farmer" className="btn btn-go-back btn-dark my-3">
            GO BACK
          </Link>
          <Button className="my-3 ml-2" onClick={createMachineProductHandler}>
            <FontAwesomeIcon icon={faPlus} />
            ADD ITEM
          </Button>
        </div>

        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {successUpdate && <Message variant="success">Profile Updated!</Message>}
        <Form onSubmit={createProductHandler}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}></Form.Control>
                <Form.File
                  id="image-file"
                  label="Choose File"
                  custom
                  onChange={uploadFileHandler}></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="price"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId="seller">
                <Form.Label>Seller Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter seller name"
                  value={seller}
                  onChange={(e) => setSeller(e.target.value)}></Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }></Form.Control>
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="category"
                  as="select"
                  // placeholder="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Choose category</option>
                  <option value="Threshers">Threshers</option>
                  <option value="Tractors">Tractors</option>
                  <option value="Harrows">Harrows</option>
                  <option value="Harvesters">Harvesters</option>
                  <option value="Mowers">Mowers</option>
                  <option value="Balers">Balers</option>
                  <option value="Plows">Plows</option>
                  <option value="Seeders">Seeders</option>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Sprayers">Sprayers</option>
                  <option value="Others">Others</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="quantity"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId="machinepower">
                <Form.Label>Machine Power</Form.Label>
                <Form.Control
                  type="machinepower"
                  placeholder="Enter machine power"
                  value={machine_power}
                  onChange={(e) =>
                    setMachine_power(e.target.value)
                  }></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default SeedListEdit;
