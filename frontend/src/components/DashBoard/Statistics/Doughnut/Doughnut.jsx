import React, { useEffect,useState } from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2';
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import Message from './../../../../components/Message/Message'
import Loader from './../../../../components/Loader/Loader'
import { listSupplierProducts } from './../../../../actions/supplierProduct'
import { listLendMachineProducts } from './../../../../actions/productLendMachinesActions';

// const data = {
//     labels: ['paddy', 'seeds', 'fruits'],
//     datasets: [{
//         data: [2, 1, 3],
//         backgroundColor: [
//             '#FF6384',
//             '#36A2EB',
//             '#FFCE56'
//         ],
//         hoverBackgroundColor: [
//             '#FF6384',
//             '#36A2EB',
//             '#FFCE56'
//         ]
//     }]
// };

// const DoughnutComponent = () => {

//     const dispatch = useDispatch()
//     let history = useHistory()

//     const supplierProductList = useSelector(state => state.supplierProductList)
//     const { loading: loadingProducts, error: errorProducts } = supplierProductList

//     const userLogin = useSelector(state => state.userLogin)
//     const { userInfo } = userLogin

//     useEffect(() => {
//         if (!userInfo.isAdmin && !userInfo) {
//             history.push('/login')
//         } else {
//             dispatch(listSupplierProducts())
//         }
//     }, [dispatch, history, userInfo])

//     return (
//         <>
//             <h4 style={{ marginTop: "40px", textAlign: "center" }}>Suppliers</h4>
//             {loadingProducts ? <Loader />
//                 : errorProducts ? <Message variant='danger'>{errorProducts}</Message>
//                     : (
//                         <Doughnut data={data} />
//                     )
//             }
//         </>
//     )
// }

// export default DoughnutComponent

const DoughnutComponent = () => {
    const dispatch = useDispatch();
    let history = useHistory();

    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    const productLendMachinesList = useSelector(state => state.productLendMachinesList);
    const { loading: loadingMachine, error: errorMachine, productLendMachines } = productLendMachinesList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo.isAdmin && !userInfo) {
            history.push('/login');
        } else {
            dispatch(listLendMachineProducts());
        }
    }, [dispatch, history, userInfo]);

    useEffect(() => {
        if (productLendMachines) {
            const categoryCount = productLendMachines.reduce((acc, machine) => {
                const category = machine.category;
                if (!acc[category]) {
                    acc[category] = 0;
                }
                acc[category]++;
                return acc;
            }, {});

            const categories = Object.keys(categoryCount);
            const counts = Object.values(categoryCount);

            setChartData({
                labels: categories,
                datasets: [{
                    data: counts,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                    ]
                }]
            });
        }
    }, [productLendMachines]);

    return (
        <>
            <h4 style={{ marginTop: "40px", textAlign: "center" }}>Equipment Categories</h4>
            {loadingMachine ? <Loader />
                : errorMachine ? <Message variant='danger'>{errorMachine}</Message>
                    : (
                        <Doughnut data={chartData} />
                    )
            }
        </>
    );
}

export default DoughnutComponent;
