import * as React from 'react';
import './App.css';
import SearchForm from './SearchForm';
import { Table } from 'react-bootstrap';
import { FilterRowState } from './FilterRow';

class CardTypes extends React.Component<{}, {results: any[]}> {
    constructor(props: {}, context: any) {
        super(props, context);
        this.state = {
            results: []
        };
    }

    render() {
        const fields = [{
            id: '1',
            name: 'Első field'
        }, {
            id: '2',
            name: 'Második field'
        }];

        return (
            <div>
                <SearchForm fields={fields} onSubmit={this.search}/>
                <Table responsive={true} hover={true} bordered={true}>
                    <thead>
                    <tr>
                        <th>Megnevezés</th>
                        <th>Leírás</th>
                        <th>Portálon megjelenik?</th>
                        <th>Aktív?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.results.map(this.renderItem)
                    }
                    </tbody>
                </Table>
            </div>
        );
    }

    renderItem = (item: any) => (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>Igen</td>
            <td>Nem</td>
        </tr>
    )

    search = (rows: FilterRowState[]) => {
        this.setState({...this.state, results: [{id: 1, name: 'Első találat'}, {id: 2, name: 'Második találat'}]});
    }
}

export default CardTypes;
