import * as React from 'react';
import './App.css';
import { Button, FormControl } from 'react-bootstrap';

export interface FilterRowState {
    selectedField: string;
    condition: string;
    text: string;
}

class FilterRow extends React.Component<{ data: FilterRowState, fields: { id: string, name: string }[], onDeleteClick: (row: FilterRowState) => void, onChange: (state: FilterRowState) => void }, {}> {
    render() {
        return (
            <div>
                <FormControl componentClass="select" placeholder="select" value={this.props.data.selectedField}>
                    {
                        this.props.fields.map(field => <option key={field.id} value={field.id}>{field.name}</option>)
                    }
                </FormControl>

                <FormControl componentClass="select" placeholder="select" onChange={this.onConditionSelected} value={this.props.data.condition}>
                    <option value="contains">tartalmazza</option>
                </FormControl>

                <FormControl type="text" placeholder="Megnevezés"
                             value={this.props.data.text}
                             onChange={(event) => this.props.onChange({...this.props.data, text: (event.target as any).value})}/>

                <Button bsStyle="danger" onClick={() => this.props.onDeleteClick(this.props.data)}>Törlés</Button>
            </div>
        );
    }

    onConditionSelected = (item: any) => {
        this.props.onChange({...this.props.data, selectedField: item});
    }
}

export default FilterRow;