import React, {useState} from 'react';
import {Input, Modal, Checkbox} from 'antd';
import {debounce} from 'lodash';

const initList = [
    {
        id: 0,
        title: 'Eat',
        is_done: true
    },
    {
        id: 1,
        title: 'Code',
        is_done: false
    },
    {
        id: 2,
        title: 'Sleep',
        is_done: false
    }
]

function App() {
    const [visible, setVisible] = useState(false)
    const [thing, setThing] = useState('')
    const [list, setList] = useState(initList)

    const renderList = () => {
        const handleChange = (e) => {
            const l = list.map(element => {
                if(element.id === e.id){
                    element.is_done = !element.is_done
                }

                return element
            })

            setList(l)
        }

        const l = list.map(item => {
            return (
                <div key={item.id} className="mt-2 border p-3">
                    <div className={item.is_done ? 'text-line-through' : ''}>{item.title}</div>
                    <div className="mt-1">
                        <Checkbox checked={item.is_done} onChange={() => handleChange(item)}>Done</Checkbox>
                    </div>
                </div>
            )
        })

        l.push(
            <div key={-1} onClick={handleAdd} className="add border bg-primary text-white d-flex justify-content-center p-3 mt-2">
                Add
            </div>
        )

        return l
    }

    const handleAdd = () => {
        //Open the modal
        setVisible(true)
    }

    const handleSearchDebounced = debounce((q) => {
        console.log('handleSearchDebounced', q)
    }, 500)

    const handleSearch = (e) => {
        handleSearchDebounced(e.target.value)
        // console.log(e.target.value)
    }

    const handleOkCreateModal = () => {
        if(thing.length > 0){
            const item = {
                id: list.length,
                title: thing
            }

            setList([
                item,
                ...list
            ])
            setVisible(false)
            setThing('')
        }
    }

    const handleCancelCreateModal = () => {
        setVisible(false)
        setThing('')
    }

    return (
        <>
            <div className="container">
                <Input className="mt-3" onChange={handleSearch} placeholder="please enter something..."/>

                <div className="mt-3">
                    {renderList()}
                </div>
            </div>

            <Modal
                title="Create"
                visible={visible}
                onOk={handleOkCreateModal}
                onCancel={handleCancelCreateModal}
            >
                <div>
                    <label>What do you do?</label>
                    <Input value={thing} onChange={e => setThing(e.target.value)} placeholder="enter something..."/>
                </div>
            </Modal>
        </>
    );
}

export default App;
