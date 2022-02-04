import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

const Demo = () => {

    //     // this will be attached with each input onChangeText
    //     const [textValue, setTextValue] = useState('');
    //     // our number of inputs, we can add the length or decrease
    //     const [numInputs, setNumInputs] = useState(1);
    //     // all our input fields are tracked with this array
    //     var refInputs = useRef([textValue]);

    //     var inputs = [];
    //     for (var i = 0; i < numInputs; i++) {
    //         inputs.push(
    //             <View key={i} style={{ flexDirection: 'row', padding: 5, margin: 5 }}>
    //                 <Text style={{ padding: 5 }}>{i + 1}</Text>
    //                 <TextInput
    //                     style={{ width: '80%', borderWidth: 1, alignContent: 'center', justifyContent: 'center', alignSelf: 'center' }}
    //                     onChangeText={(value) => setInputValue(i, value)}
    //                     value={refInputs.current[i]}
    //                     placeholder="placHolder"
    //                 />
    //                 {/* To  remove textinput */}
    //                 <Pressable onPress={() => removeInput(i)} style={{ padding: 5 }} >
    //                     <AntDesign name="minuscircleo" size={20} color='red' />
    //                 </Pressable>
    //             </View>
    //         )
    //     }

    //     const setInputValue = (index, value) => {

    //         //first we are storing input value to refInputs array to track them
    //         var inputs = refInputs.current;
    //         inputs[index] = value;
    //         console.log("text value", value)
    //         //we are also  Setting the text value to the inputfield onChangeText
    //         setTextValue(value);
    //     };

    //     const addInput = () => {
    //         //add a new element in our refInputs array
    //         refInputs.current.push('');
    //         //increase the number of inputs
    //         setNumInputs(value => value + 1);
    //     };
    //     const removeInput = (i) => {
    //         //remove the array by index value
    //         refInputs.current.splice(i, 1)[0];
    //         //decrease the number of inputs
    //         setNumInputs(value => value - 1);
    //     };
    //     return (
    //         <ScrollView contentContainerStyle={{ flex: 1 }}>
    //             {inputs}
    //             <TouchableOpacity onPress={addInput} style={{ alignSelf: 'center', backgroundColor: 'red', padding: 5 }} >
    //                 <Text style={{ color: 'white', fontWeight: 'bold' }}>
    //                     +Add New Input
    //                 </Text>
    //             </TouchableOpacity>
    //             <View style={{ marginTop: 25 }}>
    //                 <Text>you have answered:</Text>
    //                 {
    //                     refInputs.current.map((value, i) => {
    //                         <Text key={i}> {'$ {i+1} - $ {value}'} < /Text>;
    //                     })
    // }


    //                         </View>
    //         </ScrollView>
    //     )


    const [inputs, setInputs] = useState([{ value: '' }]);

    const addHandler = () => {
        const _inputs = [...inputs];
        _inputs.push({ value: '' });
        setInputs(_inputs);
        //  console.log("values", JSON.stringify(inputs))
    }

    const deleteHandler = (index) => {
        const _inputs = [...inputs]
        _inputs.splice(index, 1)
        setInputs(_inputs)
        // const _inputs = inputs.filter((input,index) => index != key);
        // setInputs(_inputs);
    }
    const apply = (index) => {
      
         console.log("values--->",inputs[index])
    }

    const inputHandler = (text, index) => {
        const _inputs = [...inputs];
        _inputs[index].value = text;
        // _inputs[key].key   = key;
        setInputs(_inputs);
        // console.log("values", JSON.stringify(inputs))
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.inputsContainer}>
                {inputs.map((input, index) => (
                    <View style={styles.inputContainer} key={index}>
                        <TextInput placeholder={"Enter Name"} value={input.value} onChangeText={(text) => inputHandler(text, index)} />
                        <TouchableOpacity onPress={() => deleteHandler(index)}>
                            <Text style={{ color: "red", fontSize: 13 }}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => apply(index)}>
                            <Text style={{ color: "red", fontSize: 13 }}>apply</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <Button title="Add" onPress={addHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    inputsContainer: {
        flex: 1, marginBottom: 20
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "lightgray"
    }
})

export default Demo;