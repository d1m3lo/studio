

'use client';

import { useState, type FormEvent, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, MoreHorizontal, File, ListFilter, Trash2, Edit } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import type { Product } from '@/lib/products';
import { products as initialProducts } from '@/lib/products';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const detailedCategories = {
    'Calçados': {
        genders: ['Masculino', 'Feminino', 'Unissex'],
        subcategories: {
            'Sneakers': ['Masculino', 'Feminino', 'Unissex'],
            'Casual': ['Masculino', 'Feminino', 'Unissex'],
            'Esportivo': ['Masculino', 'Feminino', 'Unissex'],
            'Streetwear': ['Masculino', 'Feminino', 'Unissex'],
            'Chinelo': ['Masculino', 'Feminino', 'Unissex'],
            'Sandália': ['Feminino'],
            'Bota': ['Masculino', 'Feminino', 'Unissex'],
        }
    },
    'Roupas': {
        genders: ['Masculino', 'Feminino', 'Unissex'],
        subcategories: {
            'Camisetas': ['Masculino', 'Feminino', 'Unissex'],
            'Moletons': ['Masculino', 'Feminino', 'Unissex'],
            'Calças': ['Masculino', 'Feminino', 'Unissex'],
            'Jaquetas': ['Masculino', 'Feminino', 'Unissex'],
            'Vestidos': ['Feminino'],
            'Streetwear': ['Masculino', 'Feminino', 'Unissex'],
            'Camisa de time': ['Masculino', 'Unissex'],
        }
    },
    'Acessórios': {
        genders: ['Masculino', 'Feminino', 'Unissex'],
        subcategories: {
            'Bonés e Gorros': ['Masculino', 'Feminino', 'Unissex'],
            'Mochilas e Bolsas': ['Masculino', 'Feminino', 'Unissex'],
            'Relógios': ['Masculino', 'Feminino', 'Unissex'],
            'Óculos': ['Masculino', 'Feminino', 'Unissex'],
        }
    },
    'Perfumes': {
        genders: ['Masculino', 'Feminino', 'Unissex'],
        subcategories: {
            'Masculino': ['Masculino'],
            'Feminino': ['Feminino'],
            'Unissex': ['Unissex'],
            'Importados': ['Masculino', 'Feminino', 'Unissex'],
        }
    },
};

type Category = keyof typeof detailedCategories;
type Gender = 'Masculino' | 'Feminino' | 'Unissex';
type Tag = 'lançamento' | 'destaque' | 'oferta';

const parseSizes = (sizesInput: string): string[] => {
    const rangeRegex = /^(\d+)-(\d+)$/;
    const match = sizesInput.match(rangeRegex);

    if (match) {
        const start = parseInt(match[1], 10);
        const end = parseInt(match[2], 10);
        if (!isNaN(start) && !isNaN(end) && start <= end) {
            return Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString());
        }
    }
    
    return sizesInput.split(',').map(s => s.trim()).filter(s => s);
}


function AddProductDialog({ onAddProduct }: { onAddProduct: (newProduct: any) => void }) {
    const { toast } = useToast();
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrls, setImageUrls] = useState(['']);
    const [colors, setColors] = useState([{ name: '', hex: '', sizes: '' }]);
    const [globalSizes, setGlobalSizes] = useState('');
    const [subcategory, setSubcategory] = useState('');

    const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const availableCategories = useMemo(() => {
        if (selectedGenders.length === 0) return Object.keys(detailedCategories);
        
        return Object.entries(detailedCategories)
            .filter(([_, details]) => 
                selectedGenders.some(gender => details.genders.includes(gender))
            )
            .map(([categoryName]) => categoryName);

    }, [selectedGenders]);

    const availableSubcategories = useMemo(() => {
        if (!selectedCategory) return [];
        
        const categoryDetails = detailedCategories[selectedCategory as Category];
        if (!categoryDetails) return [];
        
        if (selectedGenders.length === 0) {
            return Object.keys(categoryDetails.subcategories);
        }
        
        return Object.entries(categoryDetails.subcategories)
            .filter(([_, subGenders]) =>
                 selectedGenders.some(gender => subGenders.includes(gender))
            )
            .map(([subCategoryName]) => subCategoryName);

    }, [selectedCategory, selectedGenders]);

    const handleGenderChange = (gender: Gender, checked: boolean) => {
        setSelectedGenders(prev => {
            const newGenders = checked ? [...prev, gender] : prev.filter(g => g !== gender);
            
            if (!availableCategories.includes(selectedCategory)) {
                 setSelectedCategory('');
            }
            return newGenders;
        });
    };
    
    useEffect(() => {
        if (selectedCategory && !availableCategories.includes(selectedCategory)) {
            setSelectedCategory('');
            setSubcategory('');
        }
    }, [availableCategories, selectedCategory]);

    useEffect(() => {
        setSubcategory('');
    }, [selectedCategory]);

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value as Category);
    };

    const handleAddImageUrl = () => {
        setImageUrls([...imageUrls, '']);
    };

    const handleRemoveImageUrl = (index: number) => {
        if (imageUrls.length > 1) {
            const newImageUrls = [...imageUrls];
            newImageUrls.splice(index, 1);
            setImageUrls(newImageUrls);
        }
    };

    const handleImageUrlChange = (index: number, value: string) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value;
        setImageUrls(newImageUrls);
    };

    const handleAddColor = () => {
        setColors([...colors, { name: '', hex: '', sizes: '' }]);
    };

    const handleRemoveColor = (index: number) => {
        if (colors.length > 1) {
            const newColors = [...colors];
            newColors.splice(index, 1);
            setColors(newColors);
        }
    };

    const handleColorChange = (index: number, field: 'name' | 'hex' | 'sizes', value: string) => {
        const newColors = [...colors];
        newColors[index][field] = value;
        setColors(newColors);
    };
    
    const handleTagChange = (tag: Tag, checked: boolean) => {
        setSelectedTags(prev => 
            checked ? [...prev, tag] : prev.filter(t => t !== tag)
        );
    };

    const handleAddProduct = (e: FormEvent) => {
        e.preventDefault();

        if (!name || !price || !selectedCategory) {
             toast({
                variant: "destructive",
                title: "Campos obrigatórios",
                description: "Nome, preço e categoria são obrigatórios.",
            });
            return;
        }
        
        const hasColors = colors.some(c => c.name && c.hex);

        const newProduct = {
            id: `prod_${Date.now()}`,
            name,
            price: parseFloat(price),
            oldPrice: oldPrice ? parseFloat(oldPrice) : undefined,
            brand,
            description,
            genders: selectedGenders,
            category: selectedCategory as Category,
            subcategory,
            image: { imageUrl: imageUrls[0] || '', imageHint: '' },
            imageHover: { imageUrl: imageUrls[1] || imageUrls[0] || '', imageHint: '' },
            images: imageUrls.map(url => ({ imageUrl: url, imageHint: '' })).filter(img => img.imageUrl),
            colors: hasColors ? colors.map(c => ({...c, sizes: parseSizes(c.sizes)})).filter(c => c.name && c.hex) : undefined,
            sizes: !hasColors ? parseSizes(globalSizes) : undefined,
            tags: selectedTags,
        };

        onAddProduct(newProduct);
        
        toast({
            title: "Produto adicionado!",
            description: `${name} foi adicionado com sucesso.`,
        });

        // Reset form
        setName('');
        setPrice('');
        setOldPrice('');
        setBrand('');
        setDescription('');
        setSelectedGenders([]);
        setSelectedCategory('');
        setSubcategory('');
        setImageUrls(['']);
        setGlobalSizes('');
        setColors([{name: '', hex: '', sizes: ''}]);
        setSelectedTags([]);
        setIsOpen(false);
    }
    
    const hasColors = colors.some(c => c.name || c.hex);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                 <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Adicionar Produto
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <form onSubmit={handleAddProduct}>
                    <DialogHeader>
                        <DialogTitle>Adicionar Novo Produto</DialogTitle>
                        <DialogDescription>
                            Preencha as informações abaixo para adicionar um novo produto ao catálogo.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-6 max-h-[70vh] overflow-y-auto px-2">
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-name" className="text-right">
                                Nome
                            </Label>
                            <Input id="product-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do produto" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-price" className="text-right">
                                Preço
                            </Label>
                            <Input id="product-price" value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="99.99" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-old-price" className="text-right">
                                Preço Antigo
                            </Label>
                            <Input id="product-old-price" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} type="number" placeholder="199.99" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-brand" className="text-right">
                                Marca
                            </Label>
                            <Input id="product-brand" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Marca do produto" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-description" className="text-right">
                                Descrição
                            </Label>
                            <Textarea id="product-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descreva o produto" className="col-span-3 min-h-[100px]" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Gênero</Label>
                            <div className="col-span-3 flex items-center gap-4">
                                {(['Masculino', 'Feminino', 'Unissex'] as Gender[]).map(gender => (
                                    <div key={gender} className="flex items-center gap-2">
                                        <Checkbox 
                                            id={`gender-${gender}`} 
                                            checked={selectedGenders.includes(gender)}
                                            onCheckedChange={(checked) => handleGenderChange(gender, !!checked)}
                                        />
                                        <Label htmlFor={`gender-${gender}`}>{gender}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-category" className="text-right">
                                Categoria
                            </Label>
                            <Select 
                                value={selectedCategory}
                                onValueChange={handleCategoryChange} 
                                disabled={selectedGenders.length === 0}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Selecione uma categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableCategories.map(cat => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-subcategory" className="text-right">
                                Subcategoria
                            </Label>
                            <Select 
                                value={subcategory} 
                                onValueChange={setSubcategory} 
                                disabled={!selectedCategory || availableSubcategories.length === 0}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Selecione uma subcategoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableSubcategories.map(sub => (
                                        <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Tags</Label>
                            <div className="col-span-3 flex items-center gap-4">
                                {(['lançamento', 'destaque', 'oferta'] as Tag[]).map(tag => (
                                    <div key={tag} className="flex items-center gap-2">
                                        <Checkbox 
                                            id={`tag-${tag}`} 
                                            checked={selectedTags.includes(tag)}
                                            onCheckedChange={(checked) => handleTagChange(tag, !!checked)}
                                        />
                                        <Label htmlFor={`tag-${tag}`} className="capitalize">{tag === 'lançamento' ? 'Lançamento' : tag}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right pt-2">
                                Imagens
                            </Label>
                            <div className="col-span-3 space-y-2">
                                {imageUrls.map((url, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Input 
                                            id={`product-image-url-${index}`} 
                                            placeholder="https://..." 
                                            value={url}
                                            onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                        />
                                        <Button 
                                            type="button" 
                                            variant="destructive" 
                                            size="icon"
                                            onClick={() => handleRemoveImageUrl(index)}
                                            disabled={imageUrls.length === 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={handleAddImageUrl}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Adicionar outra imagem
                                </Button>
                            </div>
                        </div>
                        
                         <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right pt-2">
                                Cores
                            </Label>
                            <div className="col-span-3 space-y-4">
                                {colors.map((color, index) => (
                                     <div key={index} className="space-y-2 p-3 border rounded-md">
                                        <div className="flex items-center gap-2">
                                            <Input 
                                                placeholder="Nome da cor (ex: Preto)" 
                                                value={color.name}
                                                onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                                            />
                                            <Input 
                                                placeholder="Hex (ex: #000000)" 
                                                value={color.hex}
                                                onChange={(e) => handleColorChange(index, 'hex', e.target.value)}
                                                className="w-28"
                                            />
                                            <Button 
                                                type="button" 
                                                variant="destructive" 
                                                size="icon"
                                                onClick={() => handleRemoveColor(index)}
                                                disabled={colors.length === 1 && !color.name && !color.hex && !color.sizes}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                         <Input 
                                            placeholder="Tamanhos para esta cor (ex: P,M,G ou 38-42)" 
                                            value={color.sizes}
                                            onChange={(e) => handleColorChange(index, 'sizes', e.target.value)}
                                        />
                                    </div>
                                ))}
                                 <Button type="button" variant="outline" size="sm" onClick={handleAddColor}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Adicionar cor
                                </Button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit">Salvar Produto</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function EditProductDialog({ product, onUpdateProduct, open, onOpenChange }: { product: Product, onUpdateProduct: (updatedProduct: any) => void, open: boolean, onOpenChange: (open: boolean) => void }) {
    const { toast } = useToast();
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrls, setImageUrls] = useState<string[]>(['']);
    const [colors, setColors] = useState([{ name: '', hex: '', sizes: '' }]);
    const [globalSizes, setGlobalSizes] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    useEffect(() => {
        if (product && open) {
            setName(product.name);
            setPrice(product.price.toString());
            setOldPrice(product.oldPrice?.toString() || '');
            setBrand(product.brand || '');
            setDescription(product.description || '');
            
            const existingImages = product.images?.map(i => i.imageUrl).filter(Boolean) ?? [];
            const allImages = [product.image.imageUrl, product.imageHover?.imageUrl, ...existingImages].filter(Boolean);
            const uniqueImages = [...new Set(allImages)];
            setImageUrls(uniqueImages.length > 0 ? uniqueImages : ['']);
            
            if (product.colors && product.colors.length > 0) {
                setColors([...product.colors.map(c => ({ ...c, sizes: c.sizes.join(', ') }))]);
                setGlobalSizes('');
            } else {
                setColors([{ name: '', hex: '', sizes: '' }]);
                setGlobalSizes(product.sizes?.join(', ') || '');
            }

            setSubcategory(product.subcategory || '');
            setSelectedGenders(product.genders || []);
            setSelectedCategory(product.category || '');
            setSelectedTags(product.tags || []);
        }
    }, [product, open]);
    

    const availableCategories = useMemo(() => {
        if (selectedGenders.length === 0) return Object.keys(detailedCategories);
        return Object.entries(detailedCategories)
            .filter(([_, details]) => selectedGenders.some(gender => details.genders.includes(gender)))
            .map(([categoryName]) => categoryName);
    }, [selectedGenders]);

    const availableSubcategories = useMemo(() => {
        if (!selectedCategory) return [];
        const categoryDetails = detailedCategories[selectedCategory as Category];
        if (!categoryDetails) return [];
        if (selectedGenders.length === 0) return Object.keys(categoryDetails.subcategories);
        return Object.entries(categoryDetails.subcategories)
            .filter(([_, subGenders]) => selectedGenders.some(gender => subGenders.includes(gender)))
            .map(([subCategoryName]) => subCategoryName);
    }, [selectedCategory, selectedGenders]);

    const handleGenderChange = (gender: Gender, checked: boolean) => {
        setSelectedGenders(prev => {
            const newGenders = checked ? [...prev, gender] : prev.filter(g => g !== gender);
            if (selectedCategory && !availableCategories.includes(selectedCategory)) {
                 setSelectedCategory('');
            }
            return newGenders;
        });
    };
    
    const handleTagChange = (tag: Tag, checked: boolean) => {
        setSelectedTags(prev => 
            checked ? [...prev, tag] : prev.filter(t => t !== tag)
        );
    };

    useEffect(() => {
        if (selectedCategory && !availableCategories.includes(selectedCategory)) {
            setSelectedCategory('');
            setSubcategory('');
        }
    }, [availableCategories, selectedCategory]);

    useEffect(() => {
        if (subcategory && !availableSubcategories.includes(subcategory)) {
            setSubcategory('');
        }
    }, [availableSubcategories, subcategory]);

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value as Category);
    };

    const handleAddImageUrl = () => setImageUrls([...imageUrls, '']);
    const handleRemoveImageUrl = (index: number) => {
        if (imageUrls.length > 1) setImageUrls(imageUrls.filter((_, i) => i !== index));
    };
    const handleImageUrlChange = (index: number, value: string) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value;
        setImageUrls(newImageUrls);
    };

    const handleAddColor = () => setColors([...colors, { name: '', hex: '', sizes: '' }]);
    const handleRemoveColor = (index: number) => {
        if (colors.length > 1) {
             setColors(colors.filter((_, i) => i !== index));
        } else {
            setColors([{ name: '', hex: '', sizes: '' }]); // Reset if it's the last one
        }
    };
    const handleColorChange = (index: number, field: 'name' | 'hex' | 'sizes', value: string) => {
        const newColors = [...colors];
        newColors[index] = { ...newColors[index], [field]: value };
        setColors(newColors);
    };
    

    const handleUpdateProduct = (e: FormEvent) => {
        e.preventDefault();
        
        const hasColors = colors.some(c => c.name && c.hex);

        const updatedProduct = {
            ...product,
            name,
            price: parseFloat(price),
            oldPrice: oldPrice ? parseFloat(oldPrice) : undefined,
            brand,
            description,
            genders: selectedGenders,
            category: selectedCategory as Category,
            subcategory,
            image: { imageUrl: imageUrls[0] || '', imageHint: product.image.imageHint || '' },
            imageHover: { imageUrl: imageUrls[1] || imageUrls[0] || '', imageHint: product.imageHover?.imageHint || '' },
            images: imageUrls.map(url => ({ imageUrl: url, imageHint: '' })).filter(img => img.imageUrl),
            colors: hasColors ? colors.map(c => ({...c, sizes: parseSizes(c.sizes)})).filter(c => c.name && c.hex) : undefined,
            sizes: !hasColors ? parseSizes(globalSizes) : undefined,
            tags: selectedTags,
        };
        onUpdateProduct(updatedProduct);
        toast({ title: "Produto atualizado!", description: `${name} foi atualizado com sucesso.` });
        onOpenChange(false);
    }
    
    const hasColors = colors.some(c => c.name || c.hex);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[625px]">
                <form onSubmit={handleUpdateProduct}>
                    <DialogHeader>
                        <DialogTitle>Editar Produto</DialogTitle>
                        <DialogDescription>
                            Atualize as informações do produto abaixo.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-6 max-h-[70vh] overflow-y-auto px-2">
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-product-name" className="text-right">Nome</Label>
                            <Input id="edit-product-name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-product-price" className="text-right">Preço</Label>
                            <Input id="edit-product-price" value={price} onChange={(e) => setPrice(e.target.value)} type="number" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-product-old-price" className="text-right">Preço Antigo</Label>
                            <Input id="edit-product-old-price" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} type="number" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-product-brand" className="text-right">Marca</Label>
                            <Input id="edit-product-brand" value={brand} onChange={(e) => setBrand(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-product-description" className="text-right">Descrição</Label>
                            <Textarea id="edit-product-description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3 min-h-[100px]" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Gênero</Label>
                            <div className="col-span-3 flex items-center gap-4">
                                {(['Masculino', 'Feminino', 'Unissex'] as Gender[]).map(gender => (
                                    <div key={gender} className="flex items-center gap-2">
                                        <Checkbox 
                                            id={`edit-gender-${gender}`} 
                                            checked={selectedGenders.includes(gender)}
                                            onCheckedChange={(checked) => handleGenderChange(gender, !!checked)}
                                        />
                                        <Label htmlFor={`edit-gender-${gender}`}>{gender}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-product-category" className="text-right">Categoria</Label>
                            <Select value={selectedCategory} onValueChange={handleCategoryChange} disabled={selectedGenders.length === 0}>
                                <SelectTrigger className="col-span-3"><SelectValue placeholder="Selecione uma categoria" /></SelectTrigger>
                                <SelectContent>{availableCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-product-subcategory" className="text-right">Subcategoria</Label>
                            <Select value={subcategory} onValueChange={setSubcategory} disabled={!selectedCategory || availableSubcategories.length === 0}>
                                <SelectTrigger className="col-span-3"><SelectValue placeholder="Selecione uma subcategoria" /></SelectTrigger>
                                <SelectContent>{availableSubcategories.map(sub => <SelectItem key={sub} value={sub}>{sub}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Tags</Label>
                            <div className="col-span-3 flex items-center gap-4">
                                {(['lançamento', 'destaque', 'oferta'] as Tag[]).map(tag => (
                                    <div key={tag} className="flex items-center gap-2">
                                        <Checkbox 
                                            id={`edit-tag-${tag}`} 
                                            checked={selectedTags.includes(tag)}
                                            onCheckedChange={(checked) => handleTagChange(tag, !!checked)}
                                        />
                                        <Label htmlFor={`edit-tag-${tag}`} className="capitalize">{tag === 'lançamento' ? 'Lançamento' : tag}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right pt-2">Imagens</Label>
                            <div className="col-span-3 space-y-2">
                                {imageUrls.map((url, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Input value={url} onChange={(e) => handleImageUrlChange(index, e.target.value)} />
                                        <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveImageUrl(index)} disabled={imageUrls.length === 1}><Trash2 className="h-4 w-4" /></Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={handleAddImageUrl}><PlusCircle className="mr-2 h-4 w-4" />Adicionar outra imagem</Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right pt-2">
                                Cores
                            </Label>
                            <div className="col-span-3 space-y-4">
                                {colors.map((color, index) => (
                                     <div key={index} className="space-y-2 p-3 border rounded-md">
                                        <div className="flex items-center gap-2">
                                            <Input 
                                                placeholder="Nome da cor (ex: Preto)" 
                                                value={color.name}
                                                onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                                            />
                                            <Input 
                                                placeholder="Hex (ex: #000000)" 
                                                value={color.hex}
                                                onChange={(e) => handleColorChange(index, 'hex', e.target.value)}
                                                className="w-28"
                                            />
                                            <Button 
                                                type="button" 
                                                variant="destructive" 
                                                size="icon"
                                                onClick={() => handleRemoveColor(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                         <Input 
                                            placeholder="Tamanhos para esta cor (ex: P,M,G ou 38-42)" 
                                            value={color.sizes}
                                            onChange={(e) => handleColorChange(index, 'sizes', e.target.value)}
                                        />
                                    </div>
                                ))}
                                 <Button type="button" variant="outline" size="sm" onClick={handleAddColor}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Adicionar cor
                                </Button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="secondary">Cancelar</Button></DialogClose>
                        <Button type="submit">Salvar Alterações</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export function ProductManager() {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleAddProduct = (newProduct: Product) => {
        setProducts(prev => [newProduct, ...prev]);
    }
    
    const handleUpdateProduct = (updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    }

    const handleRemoveProduct = (productId: string) => {
        setProducts(prev => prev.filter(p => p.id !== productId));
    }

    return (
        <>
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">Todos</TabsTrigger>
                        <TabsTrigger value="active">Ativos</TabsTrigger>
                        <TabsTrigger value="draft">Rascunho</TabsTrigger>
                        <TabsTrigger value="archived" className="hidden sm:flex">
                            Arquivados
                        </TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 gap-1">
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filtro
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Ativo</DropdownMenuItem>
                                <DropdownMenuItem>Rascunho</DropdownMenuItem>
                                <DropdownMenuItem>Arquivado</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Exportar
                            </span>
                        </Button>
                        <AddProductDialog onAddProduct={handleAddProduct} />
                    </div>
                </div>
                <TabsContent value="all">
                     <Card>
                        <CardHeader>
                            <CardTitle>Produtos</CardTitle>
                            <CardDescription>
                                Gerencie seus produtos aqui. Adicione, edite ou remova produtos.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="hidden w-[100px] sm:table-cell">
                                            <span className="sr-only">Imagem</span>
                                        </TableHead>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="hidden md:table-cell">Preço</TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Categoria
                                        </TableHead>
                                        <TableHead>
                                            <span className="sr-only">Ações</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.map(product => (
                                        <TableRow key={product.id}>
                                            <TableCell className="hidden sm:table-cell">
                                                <Image
                                                    alt={product.name}
                                                    className="aspect-square rounded-md object-cover"
                                                    height="64"
                                                    src={product.image?.imageUrl || `https://placehold.co/64x64?text=${product.name.charAt(0)}`}
                                                    width="64"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {product.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">Ativo</Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                R$ {product.price.toFixed(2)}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {product.category}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            aria-haspopup="true"
                                                            size="icon"
                                                            variant="ghost"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Toggle menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => setEditingProduct(product)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Editar
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleRemoveProduct(product.id)}>
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Remover
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Mostrando <strong>1-{products.length}</strong> de <strong>{products.length}</strong> produtos
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
            {editingProduct && (
                <EditProductDialog
                    product={editingProduct}
                    onUpdateProduct={(p) => {
                        handleUpdateProduct(p);
                        setEditingProduct(null);
                    }}
                    open={!!editingProduct}
                    onOpenChange={(open) => {
                        if (!open) setEditingProduct(null);
                    }}
                />
            )}
        </>
    )
}

    
