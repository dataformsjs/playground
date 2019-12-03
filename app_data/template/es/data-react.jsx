export function ShowCountries(props) {
    return (
        <React.Fragment>
            <h1>Países</h1>
            
            <InputFilter
                filter-selector="table"
                filter-results-selector="h1"
                filter-results-text-all="{totalCount} Países"
                filter-results-text-filtered="Mostrando {displayCount} de {totalCount} países"
                placeholder="Introduzca filtro, ejemplo 'South America'" />

            <SortableTable
                data-sort-class-odd="row-odd"
                data-sort-class-even="row-even">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th class="text-right">Tamaño (KM)</th>
                        <th class="text-right">Población</th>
                        <th>Continente</th>
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
