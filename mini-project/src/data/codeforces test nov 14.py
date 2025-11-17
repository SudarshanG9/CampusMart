def main():

    t = int(input())
    for _ in range(t):
        
        arr = list(input())
        n = len(arr)
        if n ==1:
            print(1)
            return
        l = 0
        maximum = 0
        for r in range(n):

         
            if arr[l] == '>' and arr[r] == '<':
                print(-1)
                break
            elif arr[r] == '*':
                if arr[l] == '<':
                    maximum = max(maximum, r - l + 1)
      
                else:
                    print(-1)
                    break
            elif arr[l] == '<' and arr[r] == '>':
                l = r
               
            else:
                maximum = max(maximum, r - l + 1)
                
        else:
            print(maximum)

if __name__ == "__main__":
    main()

            
            