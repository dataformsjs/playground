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
                        <th>Size (KM)</th>
                        <th>Population</th>
                        <th>Continent</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data && props.data.countries && props.data.countries.map(country => {
                        return (
                            <tr key={country.iso}>
                                <td>{country.iso}</td>
                                <td>
                                    <i class={country.iso.toLowerCase() + ' flag'}></i>
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
