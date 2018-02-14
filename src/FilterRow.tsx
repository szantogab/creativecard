import * as React from 'react';
import './App.css';
import { Button, Input } from 'reactstrap';

export interface FilterRowState {
    selectedField: string;
    condition: string;
    text: string;
}

class FilterRow extends React.Component<{ data: FilterRowState, fields: { id: string, name: string }[], onDeleteClick: (row: FilterRowState) => void, onChange: (state: FilterRowState) => void }, {}> {
    render() {
        return (
            <div>
                <Input type="select" name="select" placeholder="select" value={this.props.data.selectedField}>
                    {
                        this.props.fields.map(field => <option key={field.id} value={field.id}>{field.name}</option>)
                    }
                </Input>

                <Input type="select" name="select" placeholder="select" onChange={this.onConditionSelected} value={this.props.data.condition}>
                    <option value="contains">tartalmazza</option>
                </Input>

                <Input type="text" placeholder="Megnevezés"
                             value={this.props.data.text}
                             onChange={(event) => this.props.onChange({...this.props.data, text: (event.target as any).value})}/>

                <Button color="danger" onClick={() => this.props.onDeleteClick(this.props.data)}>Törlés</Button>
            </div>
        );
    }

    onConditionSelected = (item: any) => {
        this.props.onChange({...this.props.data, selectedField: item});
    }
}

export default FilterRow;