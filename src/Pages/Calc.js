import { useState, useEffect } from "react"
import 'jspdf-autotable';
import axios from "axios";


export default function PrixRevient() {

    const [rows, setRows] = useState(() => {
        const storedData = localStorage.getItem("rows");
        return storedData ? JSON.parse(storedData) : [{ id: 1, date: '', data: Array(21).fill('') }];
    });
    const [nextId, setNextId] = useState(2);

    const [savedLines, setSavedLines] = useState(() => {
        const storedData = localStorage.getItem("savedLines");
        return storedData ? JSON.parse(storedData) : [];
    });

    const [editingTable, setEditingTable] = useState(false);
    const [editingRow, setEditingRow] = useState(null);
    const [isEditingSecondTable, setIsEditingSecondTable] = useState(false);


    const handleArchive = async () => {
        try {
            const response = await axios.post('http://localhost:8081/archive-table', { tableName: 'your_table_name' });
            console.log(response.data.message);
        } catch (error) {
            console.error('Error archiving table:', error);
        }
    };


    useEffect(() => {
        localStorage.setItem("rows", JSON.stringify(rows));
    }, [rows]);

    const handleAddLine = () => {
        const newId = nextId;
        setRows(prevRows => [...prevRows, { id: newId, date: '', data: Array(21).fill('') }]);
        setNextId(prevId => prevId + 1);
        setIsEditingSecondTable(false);
    };

    const handleDeleteLine = (id) => {
        setSavedLines(prevSavedLines => prevSavedLines.filter(row => row.id !== id));
    };

    const handleSave = () => {
        // Only save rows from the first table
        const updatedLines = rows.map(row => ({
            ...row,
            textValues: row.textValues || Array(row.data.length).fill('') // Ensure textValues is initialized
        }));
        setSavedLines(prevSavedLines => [...prevSavedLines, ...updatedLines]);
        setRows([]);
        setEditingTable(true);
    };

    const handleDeleteTable = () => {
        setSavedLines([]);
        setEditingTable(false);
    };

    const handleEditRow = (id) => {
        setEditingRow(id);
        setIsEditingSecondTable(true);
    };

    const handleSaveRow = (id) => {
        setEditingRow(null);
        setIsEditingSecondTable(false);
    };

    const handleEditField = (id, index, value) => {
        if (isEditingSecondTable) {
            setSavedLines(prevSavedLines =>
                prevSavedLines.map(row =>
                    row.id === id ? {
                        ...row,
                        data: row.data.map((cell, i) => i === index ? value : cell)
                    } : row
                )
            );
        } else {
            setRows(prevRows =>
                prevRows.map(row =>
                    row.id === id ? {
                        ...row,
                        data: [...(row.data || []).slice(0, index), value, ...(row.data || []).slice(index + 1)],
                        textValues: [...(row.textValues || []).slice(0, index), value, ...(row.textValues || []).slice(index + 1)] // Update textValues
                    } : row
                )
            );
        }
    };

    const calculatePrixDeRevientForRow = (rowData) => {
        return (rowData || []).slice(2).reduce((total, value) => total + parseFloat(value || 0), 0).toFixed(2);
    };

    const tableHeaders = [
        'Date',
        'Puissance GE/Triphasé 230/400v',
        'Prix de Revient',
        'Type Moteur',
        'Type Alternateur',
        'Châssis',
        'Silencieux',
        'Accessoires',
        'Coffret',
        'Câblage',
        'Reservoir',
        'Silent-Bloc',
        'Peinture',
        'Batterie',
        'Imprévus',
        'Main d\'œuvre Montage',
        'Supplément Remorque',
        'Coffret N/S',
        'Supplément Capoté /Insonorisé',
        'Supplément Capoté /Intempérie',
        'Transport'
    ];


    const generatePDF = () => {
        
        const win = window.open('', '', 'width=800,height=600');

        
        const headers = [...tableHeaders]; 

        const columnWidths = tableHeaders.map((header, index) => {
            const maxCellWidth = Math.max(
                header.length * 8, 
                ...savedLines.map(row => (row.data[index]?.toString().length || 0) * 8) 
            );
            return { width: Math.max(maxCellWidth, 80) }; 
        });

        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Table to PDF</title>
                <style>
                    /* Define any custom styles for your table here */
                    @page {
                        size: 400mm 300mm; /* Double the paper size by four */
                        margin: 5mm; /* Add margin for better readability */
                    }
                    table {
                        border-collapse: collapse;
                        width: 100%;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                        font-size: 10px; /* Reduce font size */
                        position: relative; /* Enable positioning */
                    }
                    th {
                        background-color: #f2f2f1;
                    }
                    .additional-text {
                        font-weight: bold;
                    }
                    .amount {
                        position: relative;
                        padding-right: 20px; /* Adjust this value as needed */
                    }
                    .amount-text::after {
                        content: "Text Above"; /* Text to display above the amount */
                        position: absolute;
                        top: -20px; /* Adjust this value to change the distance between the text and the amount */
                        left: 0;
                        right: 0;
                        text-align: center;
                        font-size: 10px; /* Adjust font size as needed */
                    }
                    .amount-value {
                        display: block;
                    }
                </style>
            </head>
            <body>
                <table>
                    <thead>
                        <tr>
                            ${headers.map((header, index) => {
                                return `<th style="width: ${columnWidths[index].width}px;">${header}</th>`;
                            }).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${savedLines.map(row => `
                            <tr>
                                ${row.data.map((cell, index) => {
                                if (index === headers.indexOf("Puissance GE/Triphasé 230/400v")) {
                                    return `<td>${(row.textValues && row.textValues[index] || '')}</td>`;
                                } else if (index === headers.indexOf("Prix de Revient")) {
                                    return `<td>${calculatePrixDeRevientForRow(row.data)}</td>`;
                                } else if (index === headers.indexOf("Amount")) {
                                    return `
                                        <td class="amount">
                                            <div class="amount-text">${(row.textValues && row.textValues[index] || '')}</div>
                                            <hr/>
                                            <div class="amount-value">${cell}</div>
                                        </td>
                                    `;
                                } else if (index === headers.indexOf("Date")) {
                                    const date = new Date(cell);
                                    return `<td>${date.toLocaleDateString()}</td>`;
                                } else {
                                    return `<td>${(row.textValues && row.textValues[index] || '')} ${cell}</td>`;
                                }
                            }).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `;

        win.document.write(htmlContent);

        win.document.write('<button onclick="window.print()">Print</button>');

        win.document.close();
    };



    return (
        <div className=" m-3">
            <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
                    <div class="flex items-center justify-between gap-8 mb-8">
                        <div>
                            <h5
                                class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Calculation de prix de revient
                            </h5>
                            <p class="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                                You can trac your booking
                            </p>
                        </div>

                    </div>

                    <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div class="block w-full overflow-hidden md:w-max">

                        </div>

                        <div class="flex flex-col gap-2 shrink-0 sm:flex-row">
                            <button
                                class="flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                onClick={handleAddLine}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Add new line
                            </button>

                        </div>
                        <div class="w-full md:w-40">
                            
                        </div>
                    </div>
                </div>

                <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                    <div className="p-6 px-0 overflow-scroll">
                        <table className="w-full mt-4 text-left table-auto min-w-max">
                            <thead>
                                <tr>
                                    {tableHeaders.map((header, index) => (
                                        <th key={index} className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                            <p className="block font-sans text-sm antialiased font-normal leading-none text-black opacity-70">
                                                {header}
                                            </p>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map(row => (
                                    <tr key={row.id}>
                                        {row.data.map((cell, index) => (
                                            <td key={index} className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                                {index === 0 ? (
                                                    <input
                                                        type="date"
                                                        value={cell}
                                                        onChange={(e) => handleEditField(row.id, index, e.target.value)}
                                                        className="border border-gray-300 rounded-md p-1"
                                                    />
                                                ) : index === 1 ? (
                                                    <input
                                                        type="text" // Change type from "number" to "text"
                                                        value={(row.textValues && row.textValues[index] || '')} // Check if row.textValues is defined
                                                        onChange={(e) => {
                                                            const updatedTextValues = [...(row.textValues || [])]; // Initialize as an empty array if undefined
                                                            updatedTextValues[index] = e.target.value;
                                                            const updatedRow = { ...row, textValues: updatedTextValues };
                                                            setRows(prevRows =>
                                                                prevRows.map(prevRow =>
                                                                    prevRow.id === row.id ? updatedRow : prevRow
                                                                )
                                                            );
                                                        }}
                                                        placeholder="Text"
                                                        className="m-2 border-gray-900"
                                                    />
                                                ) : index === 2 ? (
                                                    calculatePrixDeRevientForRow(row.data)
                                                ) : (
                                                    <>
                                                        <input
                                                            type="text"
                                                            value={(row.textValues && row.textValues[index] || '')} 
                                                            onChange={(e) => {
                                                                const updatedTextValues = [...(row.textValues || [])]; 
                                                                updatedTextValues[index] = e.target.value;
                                                                const updatedRow = { ...row, textValues: updatedTextValues };
                                                                setRows(prevRows =>
                                                                    prevRows.map(prevRow =>
                                                                        prevRow.id === row.id ? updatedRow : prevRow
                                                                    )
                                                                );
                                                            }}
                                                            placeholder="Text"
                                                            className="m-2 border-gray-900"
                                                        />
                                                        <br />
                                                        <input
                                                            type="number"
                                                            value={cell}
                                                            onChange={(e) => {
                                                                const updatedData = [...row.data];
                                                                updatedData[index] = e.target.value;
                                                                const updatedRow = { ...row, data: updatedData };
                                                                setRows(prevRows =>
                                                                    prevRows.map(prevRow =>
                                                                        prevRow.id === row.id ? updatedRow : prevRow
                                                                    )
                                                                );
                                                            }}
                                                            placeholder="Amount"
                                                            className="m-2 border-gray-300"
                                                        />
                                                    </>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                    <div class="flex items-center justify-between p-4 border-t border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        </p>
                        <div class="flex gap-2">
                            <button
                                type="button"
                                class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                onClick={handleSave}
                            >
                                save
                            </button>
                        </div>
                    </div>

                    {editingTable && (
                        <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                            {/* JSX code for the second table */}
                            <div className="p-6 px-0 overflow-scroll">
                                <table className="w-full mt-4 text-left table-auto min-w-max">
                                    <thead>
                                        <tr>
                                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50" >
                                                Edit
                                            </th>
                                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50" >
                                                Delete
                                            </th>
                                            {tableHeaders.map((header, index) => (
                                                <th key={index} className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-black opacity-70">
                                                        {header}
                                                    </p>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {savedLines.map(row => (
                                            <tr key={row.id}>
                                                <td className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                                    {editingRow === row.id ? (
                                                        <button
                                                            onClick={() => handleSaveRow(row.id)}
                                                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-2 px-4 rounded-lg bg-blue-500 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                                                        >
                                                            Save
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleEditRow(row.id)}
                                                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-2 px-4 rounded-lg bg-green-500 text-white shadow-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                                                        >
                                                            Edit
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                                    <button
                                                        onClick={() => handleDeleteLine(row.id)}
                                                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-2 px-4 rounded-lg bg-red-700 text-white shadow-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                                {row.data.map((cell, index) => (
                                                    <td key={index} className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                                        {index === 0 ? (
                                                            editingRow === row.id ? (
                                                                <input
                                                                    type="date"
                                                                    value={cell}
                                                                    onChange={(e) => handleEditField(row.id, index, e.target.value)}
                                                                    className="border border-gray-300 rounded-md p-1"
                                                                />
                                                            ) : (
                                                                cell
                                                            )
                                                        ) : index === 1 ? (
                                                            // Change input type to "text" for the second column
                                                            editingRow === row.id ? (
                                                                <input
                                                                    type="text"
                                                                    value={(row.textValues && row.textValues[index] || '')}
                                                                    onChange={(e) => {
                                                                        const updatedTextValues = [...(row.textValues || [])];
                                                                        updatedTextValues[index] = e.target.value;
                                                                        const updatedRow = { ...row, textValues: updatedTextValues };
                                                                        setSavedLines(prevSavedLines =>
                                                                            prevSavedLines.map(prevRow =>
                                                                                prevRow.id === row.id ? updatedRow : prevRow
                                                                            )
                                                                        );
                                                                    }}
                                                                    placeholder="Text"
                                                                    className="m-2 border-gray-900"
                                                                />
                                                            ) : (
                                                                (row.textValues && row.textValues[index] || '')
                                                            )
                                                        ) : index === 2 ? (
                                                            calculatePrixDeRevientForRow(row.data)
                                                        ) : (
                                                            <>
                                                                {editingRow === row.id ? (
                                                                    <>
                                                                        <input
                                                                            type="text"
                                                                            value={(row.textValues && row.textValues[index] || '')}
                                                                            onChange={(e) => {
                                                                                const updatedTextValues = [...(row.textValues || [])];
                                                                                updatedTextValues[index] = e.target.value;
                                                                                const updatedRow = { ...row, textValues: updatedTextValues };
                                                                                setSavedLines(prevSavedLines =>
                                                                                    prevSavedLines.map(prevRow =>
                                                                                        prevRow.id === row.id ? updatedRow : prevRow
                                                                                    )
                                                                                );
                                                                            }}
                                                                            placeholder="Text"
                                                                            className="m-2 border-gray-900"
                                                                        />
                                                                        <br />
                                                                        <input
                                                                            type="number"
                                                                            value={cell}
                                                                            onChange={(e) => {
                                                                                const updatedData = [...row.data];
                                                                                updatedData[index] = e.target.value;
                                                                                const updatedRow = { ...row, data: updatedData };
                                                                                setSavedLines(prevSavedLines =>
                                                                                    prevSavedLines.map(prevRow =>
                                                                                        prevRow.id === row.id ? updatedRow : prevRow
                                                                                    )
                                                                                );
                                                                            }}
                                                                            placeholder="Amount"
                                                                            className="m-2 border-gray-300"
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span>{(row.textValues && row.textValues[index] || '')}</span>
                                                                        <br />
                                                                        <span>{cell}</span>
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        <tr>
                                            <button onClick={handleArchive}>Archive</button>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>

                            <div className="m-3">
                                <div className="flex justify-center mt-4">

                                    <button
                                        className="Btn1"
                                        onClick={handleDeleteTable}
                                    >
                                        <div className="sign">
                                            <svg
                                                viewBox="0 0 16 16"
                                                className="bi bi-trash3-fill"
                                                fill="currentColor"
                                                height="18"
                                                width="18"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div
                                            className="text"
                                        >
                                            Delete
                                        </div>
                                    </button>

                                    <button className="Btn">
                                        <div className="svgWrapper">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 42 42"
                                                className="svgIcon"
                                            >
                                                <path
                                                    strokeWidth="5"
                                                    stroke="#fff"
                                                    d="M9.14073 2.5H32.8593C33.3608 2.5 33.8291 2.75065 34.1073 3.16795L39.0801 10.6271C39.3539 11.0378 39.5 11.5203 39.5 12.0139V21V37C39.5 38.3807 38.3807 39.5 37 39.5H5C3.61929 39.5 2.5 38.3807 2.5 37V21V12.0139C2.5 11.5203 2.6461 11.0378 2.91987 10.6271L7.89266 3.16795C8.17086 2.75065 8.63921 2.5 9.14073 2.5Z"
                                                ></path>
                                                <rect
                                                    strokeWidth="3"
                                                    stroke="#fff"
                                                    rx="2"
                                                    height="4"
                                                    width="11"
                                                    y="18.5"
                                                    x="15.5"
                                                ></rect>
                                                <path strokeWidth="5" stroke="#fff" d="M1 12L41 12"></path>
                                            </svg>
                                            <div className="text">Archive</div>
                                        </div>
                                    </button>
                                </div>

                                <button className="cssbuttons-io-button" onClick={generatePDF}>
                                    Download
                                    <div className="icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="svgIcon"
                                        >
                                            <path
                                                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </div>
                                </button>

                            </div>
                        </div>
                    )}
                </div>
            </div >
        </div   >
    )
}