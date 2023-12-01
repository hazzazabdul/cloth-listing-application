/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { getDataFromLocalStorage } from "../../Utilities/localstorage";
import "./FormData.css";
import { MdDelete } from "react-icons/md";

function FormData() {
  const [input, setInput] = useState(getDataFromLocalStorage());

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const inputObj = {};
    const elements = [...event.target.elements];

    for (const obj of input) {
      if (obj.id === event.target.id.value) return alert("Id Already Exist");
    }

    elements.forEach((elem) => {
      if (elem.type === "radio") {
        if (elem.checked) {
          inputObj[elem.name] = elem.value;
        }
        elem.value = "";
        elem.checked = false;
      } else {
        inputObj[elem.name] = elem.value;
        elem.value = "";
        elem.checked = false;
      }
    });
    isNaN(Number(inputObj["name"]))
      ? setInput([...input, inputObj])
      : alert("Please give a valid name");
  };

  const deleteItem = (id) => {
    const filteredItem = input.filter((cloth) => cloth.id !== id);
    setInput(filteredItem);
  };

  useEffect(() => {
    localStorage.setItem("input", JSON.stringify(input));
  }, [input]);

  return (
    <div className="container">
      <div className="main">
        <div className="from__group">
          <h1 className="store__heading">Cloth Listing App</h1>
          <h3 className="store__heading">Add Your Products</h3>
          <form
            className="cloth__form"
            action="#"
            onSubmit={handleFormSubmit}
          >
            <label htmlFor="cloth-id">Cloth Id</label>
            <input
              placeholder="id"
              required
              className="form-in"
              type="number"
              min="1"
              name="id"
              id="cloth-id"
            />
            <br />
            <label htmlFor="cloth-name">Cloth Name</label>
            <input
              placeholder="name"
              required
              className="form-in"
              type="text"
              name="name"
              id="cloth-name"
            />
            <br />
            <label htmlFor="price">Price</label>
            <input
              placeholder="price"
              required
              className="form-in"
              type="number"
              min="200"
              max="9999"
              name="price"
              id="price"
            />
            <br />
            <label htmlFor="quantity">Quantity</label>
            <input
              placeholder="quantity"
              required
              className="form-in"
              type="number"
              name="quantity"
              min="1"
              max="100"
              id="quantity"
            />
            <br />
            <label htmlFor="dexcription">Description</label>
            <textarea
              placeholder="type your message"
              required
              className="form-in"
              name="description"
              id="dexcription"
              cols="50"
              rows="4"
              maxLength="15"
            ></textarea>
            <br />
            <label htmlFor="color">Select Color</label>
            <select
              required
              className="form-in"
              name="color"
              id="color"
            >
              <option
                selected
                disabled
                value=""
              >
                Select Color
              </option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="maroon">Maroon</option>
            </select>
            <br />
            <div className="manufacture conditions">
              <label htmlFor="manufacture">Manufacture Date</label>
              <input
                required
                className="form-in"
                type="date"
                name="manufacture"
                id="manufacture"
              />
            </div>
            <br />
            <div className="size__container conditions">
              <label htmlFor="size">Sizes</label>
              <input
                required
                type="radio"
                name="size"
                id="m"
                value="M"
              />
              <label htmlFor="m">M</label>
              <input
                required
                type="radio"
                name="size"
                id="l"
                value="L"
              />
              <label htmlFor="l">L</label>
              <input
                required
                type="radio"
                name="size"
                id="xl"
                value="XL"
              />
              <label htmlFor="xl">XL</label>
            </div>
            <div className="terms__conditions conditions">
              <input
                required
                className="form-in"
                type="checkbox"
                name="terms"
                id="terms"
              />
              <label htmlFor="terms">Terms & Conditions</label>{" "}
            </div>
            <br />
            <button
              className="submit__btn"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="cloth__product__view">
          {input.length > 0 ? (
            <div>
              <table id="cloth__row">
                <thead>
                  <tr>
                    <th>Cloth Id</th>
                    <th>Cloth Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Description</th>
                    <th>Color</th>
                    <th>Manufacture</th>
                    <th>Size</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {input.map((elem) => (
                    <tr>
                      <td>{elem.id}</td>
                      <td>{elem.name}</td>
                      <td>{elem.price}</td>
                      <td>{elem.quantity}</td>
                      <td>{elem.description}</td>
                      <td>{elem.color}</td>
                      <td>{elem.manufacture}</td>
                      <td>{elem.size}</td>
                      <td
                        className="deleteItem"
                        onClick={() => deleteItem(elem.id)}
                      >
                        <MdDelete color="red" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="remove__cloth">
                <button
                  className="remove__all__data"
                  onClick={() => setInput([])}
                >
                  Remove All Data
                </button>
              </div>
            </div>
          ) : (
            <div className="without__product__heading">
              <h1>No Item Added</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormData;
