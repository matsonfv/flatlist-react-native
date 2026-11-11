// Arquivo: App.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TextInput } from 'react-native';

export default function App() {
  // 1. Estado para armazenar o Array de usuários vindo da API
  const [usuarios, setUsuarios] = useState([]);
  // 2. Estado para controlar o carregamento inicial
  const [carregando, setCarregando] = useState(true);
  // 3. Estado para armazenar o texto da busca
  const [busca, setBusca] = useState('');

  // 4. Função assíncrona para buscar os dados na internet
  const buscarUsuarios = async () => {
    setCarregando(true);
    try {
      const resposta = await fetch('https://jsonplaceholder.typicode.com/users');
      const dados = await resposta.json();
      setUsuarios(dados); // Salva o array de objetos no Estado
    } catch (erro) {
      alert('Erro ao carregar os usuários.');
    } finally {
      setCarregando(false);
    }
  };

  // 4. Busca os dados assim que a tela é montada
  useEffect(() => {
    buscarUsuarios();
  }, []);

  // 5. Função de renderização individual (passada para a prop renderItem)
  // Desestruturamos { item } para ter acesso aos dados do usuário atual
  const renderizarUsuario = ({ item }) => (
    <View style={styles.card}>
      {/* Avatar circular estilizado com a primeira letra do nome */}
      <View style={styles.avatar}>
        <Text style={styles.textoAvatar}>{item.name.charAt(0)}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{item.name}</Text>
        <Text style={styles.email}>✉️ {item.email}</Text>
        <Text style={styles.empresa}>🏢 {item.company.name}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👥 Lista de Usuários</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar usuário..."
        value={busca}
        onChangeText={setBusca}
      />
      {/* Renderização Condicional: enquanto busca na API, exibe a animação */}
      {carregando ? (
        <ActivityIndicator size="large" color="#0984e3" style={{ marginTop: 50 }} />
      ) : (
        /* A FlatList com suas 3 props principais + utilitários */
        
        <FlatList
          data={usuarios.filter((usuario) =>
            usuario.name.toLowerCase().includes(busca.toLowerCase())
          )} // 1. O Array de dados
          keyExtractor={(item) => item.id.toString()} // 2. O ID único (como String)
          renderItem={renderizarUsuario} // 3. A função de montagem
          showsVerticalScrollIndicator={false} // Esconde a barra de rolagem lateral
          ListEmptyComponent={
            <Text style={styles.listaVazia}>Nenhum usuário encontrado.</Text>
          }
          
        />
      )}
    </View>
  );
}

// Arquivo: App.js (Continuação - Estilos)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textoAvatar: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f3640',
  },
  email: {
    fontSize: 14,
    color: '#636e72',
    marginTop: 2,
  },
  empresa: {
    fontSize: 12,
    color: '#b2bec3',
    marginTop: 4,
  },
  listaVazia: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginTop: 40,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#dcdde1',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
});