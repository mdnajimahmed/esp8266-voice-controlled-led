package main

import (
	"bufio"
	"bytes"
	"fmt"
	"io"
	"net"
)

const (
	DELIMITER byte = '\n'
)

func (device *esp8266) read() (string, error) {
	reader := bufio.NewReader(device.conn)
	var buffer bytes.Buffer
	for {
		ba, isPrefix, err := reader.ReadLine()
		fmt.Println("hh", string(ba))
		if err != nil {
			if err == io.EOF {
				break
			}
			return "", err
		}
		buffer.Write(ba)
		if !isPrefix {
			break
		}
	}
	return buffer.String(), nil
}

func (device *esp8266) write(content string) (int, error) {
	writer := bufio.NewWriter(device.conn)
	number, err := writer.WriteString(content)
	if err == nil {
		err = writer.Flush()
	}
	return number, err
}

type esp8266 struct {
	conn *net.TCPConn
}
