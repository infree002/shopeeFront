import {
  Box,
  Flex,
  Text,
  Image,
  SimpleGrid,
  Link,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import style from "./style.module.css";
export default function Layout({ data }) {
  const [isBorderActive, setIsBorderActive] = useState([true]);

  useEffect(() => {
    setIsBorderActive(Array(data.Category.length).fill(false).fill(true, 0, 1));
  }, [data.Category.length]);

  const [id, setId] = useState("");
  const handleElementClick = (index, id) => {
    const newArray = [...isBorderActive];
    for (let i = 0; i < newArray.length; i++) {
      if (i == index) {
        newArray[i] = true;
      } else {
        newArray[i] = false;
      }
    }
    setIsBorderActive(newArray);
    setId(id);
  };
  return (
    <>
      <Flex
        flexWrap="nowrap"
        overflowX="auto"
        overflowY="hidden"
        h="12"
        pos="sticky"
        top="53px"
        bg="white"
        zIndex={1000}
        sx={{
          "::-webkit-scrollbar": {
            width: "0",
            height: "0",
          },
        }}
      >
        {data.Category.map((item, index) => {
          return (
            <>
              <Box
                alignSelf="end"
                px="15px"
                pb="3px"
                whiteSpace="nowrap"
                borderBottom={isBorderActive[index] ? "2px" : "1px"}
                borderColor={isBorderActive[index] ? "red" : "gray.300"}
                onClick={() => handleElementClick(index, item.categoryname)}
                id={item.categoryname}
              >
                <Text fontWeight="bold">{item.categoryname}</Text>
              </Box>
            </>
          );
        })}
      </Flex>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(2, minmax(150px, 1fr))"
        m="15px"
      >
        {data.ProductAll.map((item, index) => {
          if (id == "" || isBorderActive[0] || id == "สินค้าทั้งหมด") {
            return (
              <>
                <Link href="/product">
                  <Card borderRadius="xl" boxShadow="xl">
                    <Box pos="absolute" bg="red" borderRadius="xl" top="-8px" right="-4px"><Text px="10px">ลด 27%</Text></Box>
                    <CardHeader className={style.setPadding}>
                      <Image src={item.image} alt="" borderRadius="xl" />
                    </CardHeader>
                    <CardBody className={style.setPadding}>
                      <Text textAlign="center" className={style.textHead}>
                        {item.productname}
                      </Text>
                      <Text className={style.textBody}>{item.detail}</Text>
                    </CardBody>
                    <CardFooter className={style.setPadding}>
                      <Box alignSelf="end">
                        <Text>icon ดาว</Text>
                      </Box>
                      <Spacer />
                      <Box>
                        <Text>{item.pricesale}</Text>
                        <Box>
                          <Text>{item.price}</Text>
                        </Box>
                      </Box>
                    </CardFooter>
                  </Card>
                </Link>
              </>
            );
          } else if (id == item.category) {
            return (
              <>
                <Link href="/product">
                  <Card borderRadius="xl" boxShadow="xl">
                  <Box pos="absolute" bg="red" borderRadius="xl" top="-8px" right="-4px"><Text color="white" px="10px">ลด 27%</Text></Box>
                    <CardHeader className={style.setPadding}>
                      <Image src={item.image} alt="" borderRadius="xl" />
                    </CardHeader>
                    <CardBody className={style.setPadding}>
                      <Text textAlign="center" className={style.textHead}>
                        {item.productname}
                      </Text>
                      <Text className={style.textBody}>{item.detail}</Text>
                    </CardBody>
                    <CardFooter className={style.setPadding}>
                      <Box alignSelf="end">
                        <Text>icon ดาว</Text>
                      </Box>
                      <Spacer />
                      <Box>
                        <Text>{item.pricesale}</Text>
                        <Box>
                          <Text>{item.price}</Text>
                        </Box>
                      </Box>
                    </CardFooter>
                  </Card>
                </Link>
              </>
            );
          }
        })}
      </SimpleGrid>
    </>
  );
}
