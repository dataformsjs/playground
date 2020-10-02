// Basic function to allow row onClick events to highlight the selected row.
// This allows a user to easily see where they are on wide rows or mobile devices.
// Based on DataFormJS [clickToHighlight] Plugin: [js/plugins/clickToHighlight.js]
function toggleHighlight(e) {
    if (e.target.nodeName === 'A') {
        return;
    }
    e.currentTarget.classList.toggle('highlight');
}

export function ShowCountries(props) {
    return (
        <React.Fragment>
            <h1>Countries</h1>
            
            <InputFilter
                filter-selector="table"
                filter-results-selector="h1"
                filter-results-text-all="{totalCount} Countries"
                filter-results-text-filtered="Showing {displayCount} of {totalCount} Countries"
                placeholder="Enter filter, example 'North America'" />

            <SortableTable
                data-sort-class-odd="row-odd"
                data-sort-class-even="row-even">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th className="text-right">Size (KM)</th>
                        <th className="text-right">Population</th>
                        <th>Continent</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data && props.data.countries && props.data.countries.map(country => {
                        return (
                            <tr key={country.iso} onClick={toggleHighlight} className="pointer">
                                <td>{country.iso}</td>
                                <td>
                                    <i className={country.iso.toLowerCase() + ' flag'}></i>
                                    <span>{country.country}</span>
                                </td>
                                <td className="text-right" data-value={country.area_km}>{format.number(country.area_km)}</td>
                                <td className="text-right" data-value={country.population}>{format.number(country.population)}</td>
                                <td>{country.continent}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </SortableTable>
        </React.Fragment>
    )
}
