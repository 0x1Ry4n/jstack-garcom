import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { ICategory } from '../../types/Category';
import { Text } from '../Text';
import * as S from './styles';

interface Props {
  categories: ICategory[];
  onSelect: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelect }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(id: string) {
    const category = selectedCategory === id ? '' : id;

    onSelect(category);
    setSelectedCategory(category);
  }

  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={(category) => category._id}
      contentContainerStyle={{ paddingRight: 24 }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id;
        return (
          <S.Category onPress={() => handleSelectCategory(category._id)}>
            <S.Icon>
              <Text style={{ fontSize: 24, opacity: isSelected ? 1 : 0.5 }}>
                {category.icon}
              </Text>
            </S.Icon>
            <Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>
              {category.name}
            </Text>
          </S.Category>
        );
      }}
    />
  );
}
