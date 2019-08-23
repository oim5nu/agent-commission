import React, { Component } from 'react';
import { Grid, Input, Checkbox, Icon, Segment } from 'semantic-ui-react';

class App extends Component {
  state = { 
    salePrice: 0,
    commissionPercentage: 0,
    commissionGstIncluded: false,
    commission: 0,
    GST: 0,
    advertising: 0,
    grandTotal: 0
  }

  handleSalePriceChange = (e, { value }) => {
    console.log('value', value);
    this.setState({ salePrice: value });
  }

  handleCommissionPercentageChange = (e, { value }) => {
    this.setState({ commissionPercentage: value });
  }

  handleAdvertisingChange = (e, { value }) => {
    this.setState({ advertising: value });
  }  
  render() {
    const { salePrice, commissionPercentage, commissionGstIncluded, advertising } = this.state;

    let commission = 0;
    let GST = 0;
    let grandTotal = salePrice;
    if ( commissionPercentage ) {
      if ( commissionGstIncluded ) {
        commission = salePrice * commissionPercentage / 1.1;
      } else {
        commission = salePrice * commissionPercentage;
      }
      GST = commission * 0.1;
    }
    grandTotal = salePrice + commission + GST + advertising;
    return (
        <Grid style={{marginTop: "20px"}} columns="equal">
          <Grid.Row >
            <Grid.Column textAlign="right"><div style={{paddingTop: "10px"}}>Sale Price:</div></Grid.Column>
            <Grid.Column >
              <div>
                <Icon name="dollar" />
                <Input 
                  value={ salePrice ? Number(salePrice).toFixed(2) : ""}
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
                <Icon name="dollar"/>            
                <Input 
                  value={commissionPercentage ? Number(commissionPercentage).toFixed(2) : ""}
                  onChange={this.handleCommissionPercentageChange}
                />
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
            <Grid.Column textAlign="right"><div style={{paddingTop: "10px"}}>
              Commission:</div></Grid.Column>
            <Grid.Column >
              <div style={{paddingTop: "10px"}}><Icon name="dollar" />
                <span>{commission ? Number(commission).toFixed(2) : ""}</span>
              </div>
            </Grid.Column>
          </Grid.Row>                               
          <Grid.Row >
            <Grid.Column textAlign="right"><div style={{paddingTop: "10px"}}>GST:</div></Grid.Column>
            <Grid.Column >
              <div style={{paddingTop: "10px"}}><Icon name="dollar" /><span>{Number(GST).toFixed(2)}</span></div>
            </Grid.Column>
          </Grid.Row>                               
          <Grid.Row >
            <Grid.Column textAlign="right"><div style={{paddingTop: "10px"}}>Advertising:</div></Grid.Column>
            <Grid.Column >
              <Input 
                icon="percent" 
                iconPosition="left" 
                value={advertising ? Number(advertising).toFixed(2) : ""}
                onChange={this.handleAdvertisingChange}
              />
            </Grid.Column>
          </Grid.Row>                               
          <Grid.Row >
            <Grid.Column textAlign="right"><div style={{paddingTop: "10px"}}>Grand Total:</div></Grid.Column>
            <Grid.Column >
              <div style={{paddingTop: "10px"}}><Icon name="dollar" />
                <span>{grandTotal? Number(grandTotal).toFixed(2) : ""}</span>
              </div>
            </Grid.Column>
          </Grid.Row>                               
        </Grid>
    );
  }

}

export default App;
