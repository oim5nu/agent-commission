import React, { Component } from 'react';
import { Grid, Input, Checkbox, Icon } from 'semantic-ui-react';

class App extends Component {
  state = { 
    salePrice: 0,
    commissionPercentage: 0,
    commissionGstIncluded: false,
    advertising: 0
  }

  handleSalePriceChange = (e, { value }) => {
    this.setState({ salePrice: Number(value) });
  }

  handleCommissionPercentageChange = (e, { value }) => {
    this.setState({ commissionPercentage: Number(value) });
  }

  handleAdvertisingChange = (e, { value }) => {
    this.setState({ advertising: Number(value) });
  }  

  toggleCheckbox = () => {
    this.setState(prevState => ({ commissionGstIncluded: !prevState.commissionGstIncluded }))
  }

  render() {
    const { salePrice, commissionPercentage, commissionGstIncluded, advertising } = this.state;
    let commissionWithoutGst = 0;
    let commissionWithGst = 0;
    
    let GST = 0;
    let grandTotal = salePrice;
    if ( commissionPercentage ) {
      if ( commissionGstIncluded ) {
        commissionWithGst = salePrice * commissionPercentage / 100.00;
        commissionWithoutGst = salePrice * commissionPercentage / 100.00 / 1.1;
      } else {
        commissionWithoutGst = salePrice * commissionPercentage / 100.00 ;
        commissionWithGst = salePrice * commissionPercentage / 100.00 * 1.1 ;
      }
      GST = commissionWithGst - commissionWithoutGst;
    }

    grandTotal = salePrice + commissionWithGst +  + advertising;

    return (
        <Grid style={{marginTop: "20px"}} columns="equal">
          <Grid.Row >
            <Grid.Column textAlign="right"><div style={{paddingTop: "10px"}}>Sale Price:</div>
            </Grid.Column>
            <Grid.Column >
              <div>
                <Icon name="dollar" />
                <Input 
                  type="number"
                  onChange={this.handleSalePriceChange}
                />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column textAlign="right">
              <div style={{paddingTop: "10px"}}>Agent Commission:</div></Grid.Column>
            <Grid.Column >
              <div>            
                <Input 
                  type="number"
                  onChange={this.handleCommissionPercentageChange}
                />
                <Icon name="percent"/> 
              </div>
 
            </Grid.Column>
          </Grid.Row>  
          <Grid.Row >
            <Grid.Column textAlign="right">
              <div style={{paddingTop: "10px"}}>% includes GST:</div>
            </Grid.Column>
            <Grid.Column >
              <Checkbox 
                style={{paddingTop: "10px"} } toggle
                onChange={this.toggleCheckbox}
                checked={commissionGstIncluded}
              />
            </Grid.Column>
          </Grid.Row> 
          <Grid.Row >
            <Grid.Column textAlign="right">
              <div style={{paddingTop: "10px"}}>
                Commission (excl. GST):
              </div>
            </Grid.Column>
            <Grid.Column >
              <div style={{paddingTop: "10px"}}>
                <Icon name="dollar" />
                <span>{commissionWithoutGst ? Number(commissionWithoutGst).toFixed(2) : ""}</span>
              </div>
            </Grid.Column>
          </Grid.Row>                               
          <Grid.Row >
            <Grid.Column textAlign="right"><div style={{paddingTop: "10px"}}>GST:</div></Grid.Column>
            <Grid.Column >
              <div style={{paddingTop: "10px"}}>
                <Icon name="dollar" />
                <span>{ GST ? Number(GST).toFixed(2) : ""}</span>
              </div>
            </Grid.Column>
          </Grid.Row>                               
          <Grid.Row >
            <Grid.Column textAlign="right">
              <div style={{paddingTop: "10px"}}>
                Commission (incl. GST):
              </div>
            </Grid.Column>
            <Grid.Column >
              <div style={{paddingTop: "10px"}}><Icon name="dollar" />
                <span>{commissionWithGst ? Number(commissionWithGst).toFixed(2) : ""}</span>
              </div>
            </Grid.Column>
          </Grid.Row>                               
          <Grid.Row >
            <Grid.Column textAlign="right"><div style={{paddingTop: "10px"}}>Advertising:</div></Grid.Column>
            <Grid.Column >
              <div>
                <Icon name="dollar" />
                <Input 
                  type="number"
                  onChange={this.handleAdvertisingChange}
                />
              </div>
            </Grid.Column>
          </Grid.Row>                               
          <Grid.Row >
            <Grid.Column textAlign="right">
              <div style={{paddingTop: "10px"}}>Grand Total:</div>
            </Grid.Column>
            <Grid.Column >
              <div style={{paddingTop: "10px"}}>
                <Icon name="dollar" />
                <span>{grandTotal? Number(grandTotal).toFixed(2) : ""}</span>
              </div>
            </Grid.Column>
          </Grid.Row>                               
        </Grid>
    );
  }

}

export default App;
