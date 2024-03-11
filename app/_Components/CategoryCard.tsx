import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image , { StaticImageData }  from 'next/image';
import { Tooltip } from '@mui/material';
import Link from 'next/link';

interface cardProps{
    image:StaticImageData,
    children:React.ReactNode,
    className:string,
    category:string
}

const  CategoryCard=({image,children,className,category}:cardProps)=> {
  return (
    <Card className={`w-[25rem] pb-[1rem] rounded-lg ${className}  text-white`} >
    <Image alt='image' src={image} className='w-[25rem] h-[20rem] top-0 '  />
 <Tooltip title={category}>
 <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {category}
      </Typography>
      <Typography variant="body2" color="text.secondary">
       {children}
      </Typography>
    </CardContent>
 </Tooltip>
    <CardActions>
      <Link href={`/shop/${category}`} className='text-gray-300 border border-gray-400 px-3 py-1 ml-4 rounded-md hover:text-white hover:border-white transition-all duration-200'>
        Shop
      </Link>
    </CardActions>
  </Card>
  )
}

export default CategoryCard