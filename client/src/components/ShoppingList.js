import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button, Container } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import uuid from "uuid";
import { connect } from "react-redux";
import { getItems, deleteItem, addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  deleteItem = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.deleteItem.bind(this, _id)}
                  >
                    &times;
                  </Button>{" "}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  item: PropTypes.object.isRequired,
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  {
    getItems,
    deleteItem,
    addItem
  }
)(ShoppingList);
